import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverer statiske filer fra dist-mappen
app.use(express.static(path.join(__dirname, 'dist')));

// Justerte vektverdier for en bankvennlig vurdering
const VEKTING = {
    "jobbstatus": 120,
    "norsk_inntekt": 200,
    "global_inntekt": 200,
    "arbeidstilbud": 100,
    "utdanning": 70,
    "oppholdstid": 100,
    "gjeld": -250,
    "betalingshistorikk": 150,
    "språkkunnskaper": 50,
    "nettverk_i_norge": 50,
};

// Hjelpefunksjon for sikker bruk av .toLowerCase()
function safeToLowerCase(value) {
    if (value && typeof value.toLowerCase === 'function') {
        return value.toLowerCase();
    }
    return '';
}

// Funksjon for å beregne kredittscore med runding
function beregn_kredittscore(jobbstatus, norsk_inntekt, global_inntekt, arbeidstilbud, utdanning,
                             oppholdstid, gjeld, betalingshistorikk, språkkunnskaper, nettverk_i_norge) {
    const faktorer = {};

    faktorer["jobbstatus"] = VEKTING["jobbstatus"] ? 
        (["fast jobb", "egen bedrift"].includes(safeToLowerCase(jobbstatus)) ? VEKTING["jobbstatus"] : 30)
        : 0;

    // Norsk inntekt: maks 200 poeng oppnås ved ca. 75 000 NOK
    faktorer["norsk_inntekt"] = Math.round(Math.min(norsk_inntekt / 75000 * 200, 200));
    // Global inntekt: maks 200 poeng oppnås ved ca. 150 000 NOK
    faktorer["global_inntekt"] = Math.round(Math.min(global_inntekt / 150000 * 200, 200));

    // Only consider "arbeidstilbud" if the person doesn't have a stable job
    faktorer["arbeidstilbud"] = (["fast jobb", "egen bedrift"].includes(safeToLowerCase(jobbstatus))) ? 0 : (safeToLowerCase(arbeidstilbud) === "ja" ? VEKTING["arbeidstilbud"] : 0);

    const utdanning_poeng = {
        "ingen utdanning": 0, 
        "videregående": 40, 
        "bachelor": 55, 
        "master": 70
    };
    faktorer["utdanning"] = utdanning_poeng[safeToLowerCase(utdanning)] || 0;

    const oppholdstid_poeng = {
        "6 mnd": 20, 
        "1 år": 50, 
        "3+ år": 80, 
        "permanent": 100
    };
    faktorer["oppholdstid"] = oppholdstid_poeng[safeToLowerCase(oppholdstid)] || 0;

    // Gjeld: negativ effekt – maks negativt -250 poeng
    faktorer["gjeld"] = Math.round(Math.max(-250, -gjeld / 5000 * 250));

    const betalingshistorikk_poeng = {
        "ingen forsinkelser": 150, 
        "noen forsinkelser": 75, 
        "mange forsinkelser": 0
    };
    faktorer["betalingshistorikk"] = betalingshistorikk_poeng[safeToLowerCase(betalingshistorikk)] || 0;

    const språkkunnskaper_poeng = {
        "ingen": 0, 
        "litt": 25, 
        "flytende": 50
    };
    faktorer["språkkunnskaper"] = språkkunnskaper_poeng[safeToLowerCase(språkkunnskaper)] || 0;

    const nettverk_poeng = {
        "ingen": 0, 
        "venner": 25, 
        "familie": 40, 
        "profesjonelt nettverk": 50
    };
    faktorer["nettverk_i_norge"] = nettverk_poeng[safeToLowerCase(nettverk_i_norge)] || 0;

    // Beregn total score og rund av
    let score = Object.values(faktorer).reduce((a, b) => a + b, 0);
    score = Math.round(score);

    return { score, faktorer };
}

// Funksjon for å beregne lånegrad basert på score
function getLoanGrade(score) {
    let grade, approvedLoan, interestRate;
    if (score >= 900) {
        grade = 'A';
        approvedLoan = 1000000;
        interestRate = 3.5;
    } else if (score >= 800) {
        grade = 'B';
        approvedLoan = 800000;
        interestRate = 5;
    } else if (score >= 700) {
        grade = 'C';
        approvedLoan = 500000;
        interestRate = 7;
    } else if (score >= 600) {
        grade = 'D';
        approvedLoan = 300000;
        interestRate = 10;
    } else {
        grade = 'F';
        approvedLoan = 0;
        interestRate = null;
    }
    return { grade, approvedLoan, interestRate };
}

// Hovedfunksjon for kredittvurdering og generering av låneforslag
async function kredittvurdering(navn, alder, bosted, jobbstatus, norsk_inntekt, global_inntekt, 
                               arbeidstilbud, utdanning, oppholdstid, gjeld, betalingshistorikk, 
                               språkkunnskaper, nettverk_i_norge) {
    const { score, faktorer } = beregn_kredittscore(
        jobbstatus, norsk_inntekt, global_inntekt, arbeidstilbud, utdanning, oppholdstid, gjeld, betalingshistorikk, språkkunnskaper, nettverk_i_norge
    );

    const loanGrade = getLoanGrade(score);

    // Oppdatert prompt med lånegrad og faktorpoeng
    const prompt = `
Du er en AI-rådgiver for en bank som vurderer lånesøknader. 
Vurder følgende søkers kredittverdighet og gi en vennlig og oppmuntrende anbefaling:

Navn: ${navn}
Alder: ${alder}
Bosted: ${bosted}

Faktorpoeng:
${JSON.stringify(faktorer, null, 2)}

Total kredittscore: ${score}
Lånegrad: ${loanGrade.grade}
Anbefalt lånebeløp: ${loanGrade.approvedLoan} NOK
Anbefalt rente: ${loanGrade.interestRate !== null ? loanGrade.interestRate + '%' : 'Ikke kvalifisert'}

Basert på disse opplysningene, gi en vurdering av søkerens evne til å få lån med de oppgitte vilkårene, og eventuelle anbefalinger for forbedring.
Vær vennlig og oppmuntrende, og gi generelle tips for å forbedre sjansene for å få et lån i fremtiden.
Fokuser på områder som inntekt, gjeld, og betalingshistorikk, men unngå å gi konkrete tall eller avsløre detaljer om vurderingssystemet.
    `;

    let assessment = "";
    try {
        console.log("Starting Gemini API call...");
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
        });

        console.log("Prompt being sent to Gemini:", prompt);
        const result = await model.generateContent(prompt);
        console.log("Gemini API call completed.");

        const response = await result.response;
        assessment = response.text();
        console.log("Assessment generated:", assessment);

    } catch (error) {
        console.error('Feil ved API-kall:', error);
        assessment = "Beklager, vi kunne ikke generere en detaljert vurdering på dette tidspunktet.";
    }

    return {
        score,
        faktorer,
        loanGrade,
        assessment
    };
}

app.post('/api/kredittvurdering', async (req, res) => {
    console.log('Request Body:', req.body);

    try {
        const {
            navn, alder, bosted, jobbstatus, norsk_inntekt, global_inntekt,
            arbeidstilbud, utdanning, oppholdstid, gjeld, betalingshistorikk,
            språkkunnskaper, nettverk_i_norge
        } = req.body;

        const resultat = await kredittvurdering(
            navn, alder, bosted, jobbstatus, norsk_inntekt, global_inntekt,
            arbeidstilbud, utdanning, oppholdstid, gjeld, betalingshistorikk,
            språkkunnskaper, nettverk_i_norge
        );

        res.json(resultat);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Returner alle forespørsler til React-appen
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

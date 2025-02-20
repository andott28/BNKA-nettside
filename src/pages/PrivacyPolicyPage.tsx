import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Personvernregler</h2>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Innledning</h3>
            <p className="text-gray-700">
              Disse personvernreglene beskriver hvordan NorwayCredit samler inn, bruker og beskytter din personlige informasjon. Vi er forpliktet til å beskytte ditt personvern og behandle dine personopplysninger i samsvar med gjeldende lover og forskrifter.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Innsamling av Personopplysninger</h3>
            <p className="text-gray-700">
              Vi samler inn personopplysninger når du:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Søker om lån eller kredittkort</li>
              <li>Registrerer deg som bruker på vår nettside</li>
              <li>Kontakter oss via e-post, telefon eller chat</li>
              <li>Bruker våre digitale tjenester</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Personopplysningene vi samler inn kan inkludere:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Navn, adresse, telefonnummer og e-postadresse</li>
              <li>Fødselsdato og personnummer</li>
              <li>Økonomisk informasjon, som inntekt, gjeld og betalingshistorikk</li>
              <li>Informasjon om din utdanning og arbeidserfaring</li>
              <li>IP-adresse og informasjon om din bruk av våre nettsider</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Bruk av Personopplysninger</h3>
            <p className="text-gray-700">
              Vi bruker dine personopplysninger til følgende formål:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Behandle din søknad om lån eller kredittkort</li>
              <li>Vurdere din kredittverdighet</li>
              <li>Tilby deg personlig tilpassede finansielle tjenester</li>
              <li>Forbedre våre tjenester og nettsider</li>
              <li>Sende deg informasjon om våre produkter og tjenester (med ditt samtykke)</li>
              <li>Overholde gjeldende lover og forskrifter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Deling av Personopplysninger</h3>
            <p className="text-gray-700">
              Vi kan dele dine personopplysninger med:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Kredittvurderingsbyråer for å vurdere din kredittverdighet</li>
              <li>Samarbeidspartnere som tilbyr finansielle tjenester</li>
              <li>Offentlige myndigheter dersom vi er lovpålagt å gjøre det</li>
            </ul>
            <p className="mt-4 text-gray-700">
              Vi vil ikke selge dine personopplysninger til tredjeparter.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Sikkerhet</h3>
            <p className="text-gray-700">
              Vi tar sikkerheten til dine personopplysninger svært alvorlig. Vi har implementert tekniske og organisatoriske tiltak for å beskytte dine opplysninger mot uautorisert tilgang, bruk, endring eller sletting.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">6. Dine Rettigheter</h3>
            <p className="text-gray-700">
              Du har rett til å:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Få innsyn i hvilke personopplysninger vi har lagret om deg</li>
              <li>Kreve retting av uriktige eller ufullstendige opplysninger</li>
              <li>Kreve sletting av dine personopplysninger (retten til å bli glemt)</li>
              <li>Trekke tilbake ditt samtykke til behandling av dine personopplysninger</li>
              <li>Protestere mot behandling av dine personopplysninger</li>
            </ul>
            <p className="mt-4 text-gray-700">
              For å utøve dine rettigheter, vennligst kontakt oss på [kontaktinformasjon].
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Endringer i Personvernreglene</h3>
            <p className="text-gray-700">
              Vi kan oppdatere disse personvernreglene fra tid til annen. Den nyeste versjonen vil alltid være tilgjengelig på vår nettside.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Kontakt Oss</h3>
            <p className="text-gray-700">
              Hvis du har spørsmål om disse personvernreglene eller vår behandling av dine personopplysninger, vennligst kontakt oss på:
            </p>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>E-post: [support@norwaycredit.no]</li>
              <li>Telefon: [123 45 678]</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

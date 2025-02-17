import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';

const HowItWorksPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Hvordan Det Fungerer
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Vår alternative kredittvurdering gjør det mulig for internasjonale innbyggere å få tilgang til kreditt i Norge.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
              Enkel Søknadsprosess
            </h2>
            <div className="space-y-12">
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Fyll Ut Søknaden</h3>
                    <p className="mt-2 text-gray-500">
                      Fyll ut vårt enkle online søknadsskjema med din personlige og økonomiske informasjon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Alternativ Vurdering</h3>
                    <p className="mt-2 text-gray-500">
                      Vi evaluerer søknaden din grundig for å få et helhetlig bilde av din økonomiske situasjon og betalingsevne.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Rask Avgjørelse</h3>
                    <p className="mt-2 text-gray-500">
                      Motta en avgjørelse innen minutter. Hvis godkjent, vil du få dine lånevilkår og kan fortsette umiddelbart.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12">Ofte Stilte Spørsmål</h2>
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <dl className="space-y-6 divide-y divide-gray-200">
            <div className="pt-6">
              <dt className="text-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">
                    Hvem kan søke om lån?
                  </p>
                </div>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Enhver internasjonal innbygger i Norge med gyldig oppholdstillatelse kan søke. Dette inkluderer arbeidere, studenter og fastboende.
              </dd>
            </div>

            <div className="pt-6">
              <dt className="text-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">
                    Hvilke dokumenter trenger jeg?
                  </p>
                </div>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Du trenger din oppholdstillatelse, bevis på inntekt (arbeidskontrakt eller lønnsslipper), og bevis på adresse i Norge.
              </dd>
            </div>

            <div className="pt-6">
              <dt className="text-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="ml-3 text-lg leading-6 font-medium text-gray-900">
                    Hvor lang tid tar prosessen?
                  </p>
                </div>
              </dt>
              <dd className="mt-2 ml-9 text-base text-gray-500">
                Søknaden tar omtrent 5 minutter å fullføre, og du vil motta en avgjørelse innen minutter.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Klar til å komme i gang?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Søk nå og få en avgjørelse i løpet av få minutter.
          </p>
          <Link
            to="/apply"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Søk Nå
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;

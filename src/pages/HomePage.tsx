import React from 'react';
      import { Link } from 'react-router-dom';
      import { Shield, Clock, Users, ChevronRight } from 'lucide-react';

      const HomePage = () => {
        return (
          <div>
            {/* Hero Section */}
            <div className="relative bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="relative pt-10 pb-16 px-4 sm:pt-24 sm:pb-24 sm:px-6 lg:py-32 lg:px-8">
                    <main className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
                      <div className="sm:text-center lg:text-left">
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                          <span className="block">Få kreditten du</span>
                          <span className="block text-blue-600">fortjener i Norge</span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                          Vi hjelper deg med å finne de beste finansielle løsningene. Vi tilbyr raskere svar, en enklere søknadsprosess og potensielt bedre rentevilkår.
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                          <div className="rounded-md shadow">
                            <Link
                              to="/apply"
                              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
                            >
                              Søk Nå
                            </Link>
                          </div>
                          <div className="mt-3 sm:mt-0 sm:ml-3">
                            <Link
                              to="/how-it-works"
                              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                            >
                              Lær Mer
                            </Link>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                  <div className="relative">
                    <img
                      className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                      alt="Person working on finances"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Fordeler</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Hvorfor velge NorwayCredit?
                  </p>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Vi forstår de unike utfordringene internasjonale innbyggere i Norge står overfor, og tilbyr fleksible løsninger for alle.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <Shield className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Alternativ Kredittvurdering</p>
                      <p className="mt-2 ml-16 text-base text-gray-500">
                        Vi ser på hele økonomien din, ikke bare kredittscoren.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <Clock className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Rask Avgjørelse</p>
                      <p className="mt-2 ml-16 text-base text-gray-500">
                        Få svar innen 24 timer.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Internasjonal Støtte</p>
                      <p className="mt-2 ml-16 text-base text-gray-500">
                        Vi tilbyr støtte på flere språk og forstår dine internasjonale behov.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div className="bg-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Om NorwayCredit</h2>
                  <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    En mer menneskelig tilnærming til din økonomiske hverdag.
                  </p>
                </div>

                <div className="mt-10">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className="prose prose-lg text-gray-500">
                      <p>
                        Hei, jeg heter Andreas Ottem og ønsker deg velkommen til NorwayCredit. Tradisjonelle kredittvurderinger fokuserer ofte utelukkende på tall, og det er lett å miste helhetsbildet av en persons økonomi. Derfor har jeg utviklet en alternativ metode for kredittsjekk som tar hensyn til dine unike forhold.
                      </p>
                      <p>
                        Min visjon med NorwayCredit er å hjelpe deg ut av finansielle utfordringer, ikke å skape flere hindringer for de som tar lån. Med en skreddersydd prosess og et helhetlig perspektiv, er målet mitt å gi deg den støtten og fleksibiliteten du trenger for å komme videre. Velkommen til en enklere og mer helhetlig måte å vurdere kreditt på.
                      </p>
                    </div>
                    <div className="mt-5 md:mt-0">
                      <img
                        className="rounded-lg shadow-lg object-cover object-center h-full w-full"
                        src="https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        alt="Andreas Ottem"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-700">
              <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Klar til å komme i gang?</span>
                  <span className="block">Søk nå på bare 5 minutter.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-200">
                  Bli med tusenvis av fornøyde kunder som har funnet finansielle løsninger med NorwayCredit.
                </p>
                <Link
                  to="/apply"
                  className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
                >
                  Søk Nå <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        );
      };

      export default HomePage;

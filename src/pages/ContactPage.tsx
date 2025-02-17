import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Kontakt Oss
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Vi er her for å hjelpe med spørsmål om din lånesøknad.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <Phone className="h-8 w-8 text-blue-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Telefon Support</h3>
            <p className="mt-2 text-gray-500">
              Ring oss mandag til fredag<br />
              9:00 - 17:00
            </p>
            <a href="tel:+4712345678" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
              +47 123 45 678
            </a>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <Mail className="h-8 w-8 text-blue-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">E-post</h3>
            <p className="mt-2 text-gray-500">
              Vi svarer innen<br />
              24 timer
            </p>
            <a href="mailto:support@norwaycredit.no" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
              support@norwaycredit.no
            </a>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Live Chat</h3>
            <p className="mt-2 text-gray-500">
              Tilgjengelig 24/7 for<br />
              raske spørsmål
            </p>
            <button className="mt-4 text-blue-600 hover:text-blue-500">
              Start Chat
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Navn
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-200 bg-white rounded-md h-11 px-4"
                    placeholder="Ola Nordmann"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-post
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-200 bg-white rounded-md h-11 px-4"
                    placeholder="ola.nordmann@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Emne
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-200 bg-white rounded-md h-11 px-4"
                    placeholder="Forespørsel om lån"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Melding
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-200 bg-white rounded-md h-24 px-4 pt-2"
                    placeholder="Skriv din melding her..."
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Melding
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

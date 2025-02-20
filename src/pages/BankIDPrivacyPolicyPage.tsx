import React from 'react';

const BankIDPrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            BankID Personvernerklæring
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Informasjon om hvordan BankID håndterer dine personopplysninger.
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            Denne siden inneholder informasjon om hvordan BankID håndterer din personlige informasjon. Vennligst se BankIDs offisielle dokumentasjon for mer informasjon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankIDPrivacyPolicyPage;

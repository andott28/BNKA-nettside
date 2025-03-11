import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../../users';

const LoginWithoutBankIDPage = ({ onLogin }) => {
  const [birthNumber, setBirthNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [idType, setIdType] = useState('fodselsnummer'); // 'fodselsnummer' or 'dnummer'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!birthNumber || !email || !phone) {
      setErrorMessage('Vennligst fyll ut alle obligatoriske felt.');
      return;
    }

    // Basic authentication logic (replace with a real implementation)
    const user = users.find(u => u.birthNumber === birthNumber && u.email === email);

    if (user) {
      onLogin(user);
      navigate('/my-page');
    } else {
      setErrorMessage('Ugyldig fødselsnummer eller e-post.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logg Inn uten BankID
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            For å bli kunde hos oss, bør du ha norsk folkeregistrert postadresse og din bostedsadresse i ditt hjemland. Før du fyller ut skjemaet under, må du ha følgende klart:
          </p>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-600">
            <li>Fødselsnummer eller d-nummer</li>
            <li>En gyldig e-postadresse som tilhører deg</li>
            <li>Et mobilnummer som tilhører deg</li>
            <li>TIN (Tax Identification Number) hvis du har et d-nummer. Vi må ha dette, fordi du har midlertidig opphold i Norge og har skattemessig opphold til et annet land.</li>
          </ul>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Segmented Control for ID Type */}
            <div className="flex justify-center mb-4">
              <button
                type="button"
                className={`px-4 py-2 rounded-l-md border border-gray-300 ${idType === 'fodselsnummer' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setIdType('fodselsnummer')}
              >
                Fødselsnummer
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-r-md border border-gray-300 ${idType === 'dnummer' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setIdType('dnummer')}
              >
                D-nummer
              </button>
            </div>

            <div>
              <label htmlFor="birthNumber" className="sr-only">
                {idType === 'fodselsnummer' ? 'Fødselsnummer' : 'D-nummer'}
              </label>
              <input
                id="birthNumber"
                name="birthNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={idType === 'fodselsnummer' ? 'Fødselsnummer' : 'D-nummer'}
                value={birthNumber}
                onChange={(e) => setBirthNumber(e.target.value)}
              />
            </div>
            {idType === 'dnummer' && (
              <div>
                <label htmlFor="taxNumber" className="sr-only">
                  Skattenummer (TIN)
                </label>
                <input
                  id="taxNumber"
                  name="taxNumber"
                  type="text"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Skattenummer (TIN)"
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Telefon
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Telefon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logg Inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginWithoutBankIDPage;

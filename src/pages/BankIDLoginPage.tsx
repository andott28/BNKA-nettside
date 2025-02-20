import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const BankIDLoginPage = ({ onLogin }) => {
  const [birthNumber, setBirthNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    // In a real implementation, you would send the birth number to a server
    // for BankID authentication. For this example, we'll just navigate to the BankIDAuthPage.
    console.log("Remember me:", rememberMe); // Log the rememberMe value
    navigate('/bankid-auth', { state: { birthNumber } });
  };

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logg Inn med BankID
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="birthNumber" className="sr-only">
                Fødselsnummer
              </label>
              <input
                id="birthNumber"
                name="birthNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Fødselsnummer"
                value={birthNumber}
                onChange={(e) => setBirthNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                Husk meg i denne nettleseren
              </label>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleContinue}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Fortsett
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            >
              Avbryt
            </button>
          </div>
          <div className="text-sm text-center">
            <Link to="/bankid-privacy-policy" className="font-medium text-blue-600 hover:text-blue-500">
              BankID personvernerklæring
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankIDLoginPage;

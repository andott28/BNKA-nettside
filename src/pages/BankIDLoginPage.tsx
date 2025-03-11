import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const BankIDLoginPage = ({ onLogin }) => {
  const [birthNumber, setBirthNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    // Call the Supabase function to verify the birth number
    const { data, error } = await supabase.rpc('verify_birth_number', {
      p_birth_number: birthNumber,
    });

    if (error) {
      console.error('Error verifying birth number:', error);
      setErrorMessage('Feil ved verifisering av fødselsnummer.');
      return;
    }

    if (data) {
      // Simulate successful BankID authentication and navigate to MyPage
      // For demonstration purposes, we'll create a temporary email and password
      const tempEmail = `temp-${birthNumber}@example.com`;
      const tempPassword = 'temporarypassword';

      // Sign in the user with the temporary credentials
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: tempEmail,
        password: tempPassword,
      });

      if (authError) {
        console.error('Error signing in with temporary credentials:', authError);
        setErrorMessage('Feil ved innlogging. Vennligst prøv igjen.');
        return;
      }

      // Call the onLogin function with the user object
      onLogin(authData.user);
      navigate('/my-page');
    } else {
      // Handle the case where the user is not found
      setErrorMessage('Ugyldig fødselsnummer. Vennligst sjekk og prøv igjen.');
    }
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

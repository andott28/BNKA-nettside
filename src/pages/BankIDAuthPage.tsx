import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RotateCw } from 'lucide-react';
import users from '../../users';
import { supabase } from '../supabaseClient';

const BankIDAuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [referenceWords, setReferenceWords] = useState('');
  const birthNumber = location.state?.birthNumber;

  useEffect(() => {
    // Generate two random words (replace with a real word generation logic)
    const words = ['Vennlig', 'Hurtig', 'Trygg', 'Enkel', 'Moderne', 'Sikker'];
    const word1 = words[Math.floor(Math.random() * words.length)];
    const word2 = words[Math.floor(Math.random() * words.length)];
    setReferenceWords(`${word1} ${word2}`);
  }, []);

  useEffect(() => {
    // Simulate successful BankID authentication and navigate to MyPage
    // Find the user with birthNumber "12345678912"
    const andreas = users.find(user => user.birthNumber === birthNumber);

    if (andreas) {
      // Log in the user and navigate to MyPage
      onLogin(andreas);
      navigate('/my-page');
    } else {
      // Handle the case where the user is not found (e.g., display an error)
      console.error(`User with birthNumber ${birthNumber} not found.`);
      alert('Bruker ikke funnet. Vennligst kontakt kundeservice.');
      navigate('/login');
    }
  }, [navigate, onLogin, birthNumber]);

  const handleCancel = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Åpne BankID App og bekreft
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            referanseord
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">
            NorwayCredit
          </p>
        </div>

        <div className="bg-gray-100 rounded-md p-4 text-center">
          <p className="text-2xl font-semibold text-gray-900">
            {referenceWords}
          </p>
        </div>

        <div className="flex justify-center">
          <RotateCw className="h-6 w-6 text-blue-500 animate-spin" />
        </div>

        <div>
          <button
            type="button"
            onClick={handleContinue}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Kunstig Fortsett
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankIDAuthPage;

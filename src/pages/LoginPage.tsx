import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (user: any) => void;
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const LoginPage = ({ onLogin, users, setUsers }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRedirectPath = localStorage.getItem('redirectPath');
    if (storedRedirectPath) {
      localStorage.removeItem('redirectPath');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Logg Inn
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Link
              to="/bankid-login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Logg Inn med BankID
            </Link>
          </div>
          <div>
            <button
              type="button"
              onClick={() => alert('Logg inn uten BankID er ikke implementert ennå.')}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Logg Inn uten BankID
            </button>
          </div>
          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Opprett Bruker
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

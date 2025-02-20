import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  postAddress: string;
  homeAddress: string;
  birthNumber: string;
  taxNumber: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
}

interface RegisterPageProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onLogin: (user: User) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setUsers, onLogin }) => {
  const [postAddress, setPostAddress] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [birthNumber, setBirthNumber] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+47');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUsers((prevUsers) => {
      if (prevUsers.find((user) => user.email === email)) {
        alert('En bruker med denne e-postadressen eksisterer allerede.');
        return prevUsers;
      } else {
        const newUser: User = {
          postAddress,
          homeAddress,
          birthNumber,
          taxNumber,
          email,
          phone,
          countryCode,
          password,
        };
        // Logg brukeren inn umiddelbart etter registrering
        onLogin(newUser);
        alert('Konto opprettet!');
        navigate('/apply', { replace: true });
        return [...prevUsers, newUser];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Opprett Bruker
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="postAddress" className="block text-sm font-medium text-gray-700">
                Postadresse registrert i folkeregisteret (Skatteetaten)
              </label>
              <input
                id="postAddress"
                name="postAddress"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Postadresse"
                value={postAddress}
                onChange={(e) => setPostAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700">
                Din bostedsadresse i ditt hjemland
              </label>
              <input
                id="homeAddress"
                name="homeAddress"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adresse i hjemland"
                value={homeAddress}
                onChange={(e) => setHomeAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="birthNumber" className="block text-sm font-medium text-gray-700">
                Fødselsnummer eller d-nummer
              </label>
              <input
                id="birthNumber"
                name="birthNumber"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="12345678912"
                value={birthNumber}
                onChange={(e) => setBirthNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="taxNumber" className="block text-sm font-medium text-gray-700">
                Skattenummer (TIN) fra hjemlandet ditt
              </label>
              <input
                id="taxNumber"
                name="taxNumber"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Skattenummer (TIN)"
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-post
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="ola.nordmann@eksempel.no"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none rounded-none relative block w-20 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="+47"
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="123 45 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Passord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Opprett Bruker
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

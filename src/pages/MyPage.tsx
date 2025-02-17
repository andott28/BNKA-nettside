import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ onLogout, user, onDeleteAccount, onUpdateUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [countryCode, setCountryCode] = useState(user?.countryCode || '+47');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setCountryCode(user.countryCode || '+47');
    }
  }, [user]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Er du sikker på at du vil slette kontoen din? Denne handlingen er permanent.");
    if (confirmDelete) {
      onDeleteAccount();
      navigate('/');
    }
  };

  const handleSaveInformation = () => {
    const updatedUser = {
      ...user,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      countryCode: countryCode
    };
    onUpdateUser(updatedUser);
    alert('Informasjonen er oppdatert!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Min Side</h2>

          {/* Konto-informasjon */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Konto-informasjon</h3>
            {user && (
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fornavn</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Etternavn</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">E-post</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telefon</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="mt-1 block w-20 rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 ml-2 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-11 px-4"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveInformation}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Lagre Informasjon
                </button>
              </div>
            )}
          </section>

          {/* Min Kredittvurdering */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Min Kredittvurdering</h3>
            <p className="text-gray-600">Her vil du se din kredittvurdering.</p>
          </section>

          {/* Mine Lån */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Mine Lån</h3>
            <p className="text-gray-600">Her vil du se dine aktive lån.</p>
          </section>

          {/* Kredittkort */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Kredittkort</h3>
            <p className="text-gray-600">Her vil du se dine kredittkort.</p>
          </section>

          {/* Actions */}
          <div className="mt-8">
            <button
              onClick={handleDeleteAccount}
              className="text-red-600 hover:text-red-800 cursor-pointer underline"
            >
              Slett Konto
            </button>
            <button
              onClick={handleLogout}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-4"
            >
              Logg Ut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

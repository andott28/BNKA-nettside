import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Shield, Clock, Users, ChevronRight, ChevronLeft, ChevronDown, Facebook, Linkedin, List, Wallet, AlertTriangle, Settings, HelpCircle, Search, Bank } from 'lucide-react';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const MyPage = ({ onLogout, user, onDeleteAccount, onUpdateUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [countryCode, setCountryCode] = useState(user?.countryCode || '+47');
  const [transactions, setTransactions] = useState([
    // Sample transaction data
    { date: '2024-07-15', description: 'Varekjøp', amount: -250, status: 'Fullført' },
    { date: '2024-07-10', description: 'Lønnsinnsatte', amount: 50000, status: 'Fullført' },
    { date: '2024-07-01', description: 'Regningsbetaling', amount: -1200, status: 'Fullført' },
  ]);
  const [loans, setLoans] = useState([
    // Sample loan data
    { id: 1, remainingAmount: 25000, interestRate: 5.5, dueDate: '2024-08-01' },
    { id: 2, remainingAmount: 100000, interestRate: 4.2, dueDate: '2024-09-15' },
  ]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Placeholder security info
  const [lastLogin, setLastLogin] = useState('20. juli 2024 kl. 10:30');
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

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

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = React.useMemo(() => {
    if (!sortColumn) return transactions;

    return [...transactions].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, sortColumn, sortDirection]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Min Side</h2>

          {/* Account Overview */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Wallet className="h-5 w-5 mr-2 text-blue-500" /> Kontooversikt
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 font-medium">Total Saldo</p>
                <p className="text-3xl font-bold text-green-600">0 NOK</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 font-medium">Tilgjengelig Kreditt</p>
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-blue-600 mr-2">0 NOK</p>
                  {/* Placeholder Progress Bar */}
                  <div className="w-1/2 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-600 font-medium">Neste Forfallsdato</p>
                <p className="text-3xl font-bold text-red-600">Ingen</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Min Kredittvurdering */}
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" /> Min Kredittvurdering
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Din kredittscore: Vises her</p>
                  {/* Placeholder Score Gauge */}
                  <div className="w-full h-6 bg-gray-200 rounded-full mt-2">
                    <div className="bg-blue-500 h-6 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Sist oppdatert: [Dato]</p>
                </div>
              </div>

              {/* Kredittkort */}
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-500" /> Kredittkort
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600">Ingen kredittkort tilgjengelig.</p>
                </div>
              </div>

              {/* Konto-informasjon */}
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-500" /> Konto-informasjon
                </h3>
                {user && (
                  <div className="space-y-4 max-w-md">
                    <div>
                      <p className="text-sm text-gray-500">Sist innlogget: {lastLogin}</p>
                      <p className="text-sm text-gray-500">IP-adresse: {ipAddress}</p>
                      <p className="text-sm text-gray-500">2-faktor-autentisering: {twoFactorAuth ? 'Aktivert' : 'Deaktivert'}</p>
                    </div>
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
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-gray-500" /> Innstillinger
                </h3>
                <button
                  onClick={handleDeleteAccount}
                  className="text-red-600 hover:text-red-800 cursor-pointer underline"
                >
                  Slett Konto
                </button>
                <button
                  onClick={handleLogout}
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
                >
                  Logg Ut
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Transaksjonslogg */}
              <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <List className="h-5 w-5 mr-2 text-blue-500" /> Transaksjonslogg
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  {sortedTransactions.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                            Dato
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('description')}>
                            Beskrivelse
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('amount')}>
                            Beløp
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedTransactions.map((transaction) => (
                          <tr key={transaction.date + transaction.description}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600">Ingen transaksjoner funnet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

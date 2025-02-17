import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CreditCard, Home, HelpCircle, Phone, Menu, X, ChevronRight } from 'lucide-react';
import { Facebook, Linkedin } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import RegisterPage from './pages/RegisterPage';

// Pages
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ContactPage from './pages/ContactPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleDeleteAccount = () => {
    if (currentUser) {
      setUsers(prevUsers => prevUsers.filter(user => user.email !== currentUser.email));
      handleLogout();
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers => {
      // Check if the new email is already in use by another user
      const emailExists = prevUsers.some(user => user.email === updatedUser.email && user.email !== currentUser.email);
      if (emailExists) {
        alert('Denne e-postadressen er allerede i bruk.');
        return prevUsers; // Do not update the users state
      } else {
        // Update the user in the users state
        return prevUsers.map(user =>
          user.email === updatedUser.email ? { ...updatedUser } : user
        );
      }
    });
    setCurrentUser(updatedUser);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">NorwayCredit</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Hjem
                </Link>
                <Link to="/apply" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Søk Nå
                </Link>
                <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Hvordan Det Fungerer
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Kontakt
                </Link>
                {isLoggedIn && currentUser ? (
                  <Link
                    to="/my-page"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Min Side
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Logg Inn
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Hjem
                </Link>
                <Link
                  to="/apply"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Søk Nå
                </Link>
                <Link
                  to="/how-it-works"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Hvordan Det Fungerer
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Kontakt
                </Link>
                {isLoggedIn && currentUser ? (
                  <Link
                    to="/my-page"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Min Side
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Logg Inn
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} users={users} setUsers={setUsers} />} />
            <Route path="/register" element={<RegisterPage setUsers={setUsers} />} />
            <Route path="/my-page" element={<MyPage onLogout={handleLogout} user={currentUser} onDeleteAccount={handleDeleteAccount} onUpdateUser={handleUpdateUser} />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">NorwayCredit</span>
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  Gjør kreditt tilgjengelig for internasjonale innbyggere i Norge.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Produkter</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/apply" className="text-base text-gray-600 hover:text-gray-900">
                      Personlige Lån
                    </Link>
                  </li>
                  <li>
                    <Link to="/apply" className="text-base text-gray-600 hover:text-gray-900">
                      Kredittkort
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Støtte</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/how-it-works" className="text-base text-gray-600 hover:text-gray-900">
                      Hvordan Det Fungerer
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-600 hover:text-gray-900">
                      Kontakt Oss
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Juridisk</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Personvernregler
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                      Bruksvilkår
                    </a>
                  </li>
                  <li>
                     <Link to="/contact" className="text-base text-gray-600 hover:text-gray-900">
                      Kontakt Oss
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
              <p className="text-base text-gray-400 text-center md:text-left">
                &copy; 2025 NorwayCredit. Alle rettigheter reservert.
              </p>
              <div className="space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ParAct
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">
                  {user.email}
                </span>
                {user.email === 'admin@example.com' && (
                  <Link 
                    to="/admin"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
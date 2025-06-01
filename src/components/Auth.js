import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleAuth} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isSignUp ? 'Inscription' : 'Connexion'}
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isSignUp ? 'S\'inscrire' : 'Se connecter'}
        </button>
        <p className="text-center text-sm text-gray-600">
          {isSignUp ? 'Déjà un compte ?' : 'Pas de compte ?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 hover:text-blue-500"
          >
            {isSignUp ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
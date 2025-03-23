// src/Auth.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      {auth.currentUser ? (
        <div>
          <p>Connecté en tant que : {auth.currentUser.email}</p>
          <button onClick={handleSignOut}>Se déconnecter</button>
        </div>
      ) : (
        <form onSubmit={handleAuth}>
          <h2>{isSignUp ? 'Inscription' : 'Connexion'}</h2>
          <div className="auth-field">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">{isSignUp ? 'S\'inscrire' : 'Se connecter'}</button>
          <p>
            {isSignUp ? 'Déjà un compte ?' : 'Pas de compte ?'}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="toggle-auth"
            >
              {isSignUp ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
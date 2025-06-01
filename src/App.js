import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Dashboard /> : <Navigate to="/auth" />} 
            />
            <Route 
              path="/auth" 
              element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/admin" 
              element={
                user?.email === 'admin@example.com' 
                  ? <Admin /> 
                  : <Navigate to="/" />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
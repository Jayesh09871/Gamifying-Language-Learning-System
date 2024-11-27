import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create AuthContext with correct function signatures
const AuthContext = createContext({
  user: null,
  login: async (email, password) => {},  // Takes email and password
  signup: async (name, email, password) => {},  // Takes name, email, and password
  logout: () => {},  // No parameters
});

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check if there's a valid token and verify the user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:3000/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  // Login function (takes email and password)
  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3000//login', {
      email,
      password
    });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  // Signup function (takes name, email, password)
  const signup = async (name, email, password) => {
    const response = await axios.post('http://localhost:3000/signup', {
      name,
      email,
      password
    });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
  };

  // Logout function (no parameters)
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/quiz/:language" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

    </div>
  )
}

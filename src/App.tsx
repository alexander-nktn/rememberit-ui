import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Cards from './pages/cards/Cards';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile.tsx';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/cards"
        element={
          <ProtectedRoute>
            <Cards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
);

export default App;

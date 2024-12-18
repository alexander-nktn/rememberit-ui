import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Cards from './pages/cards/Cards';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './contexts/UserContext'; // Import UserProvider

const App: React.FC = () => (
  <UserProvider>
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
  </UserProvider>
);

export default App;

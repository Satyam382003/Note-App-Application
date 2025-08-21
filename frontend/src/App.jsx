import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root path "/" to Login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Your main routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Catch-all for unknown routes (optional) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

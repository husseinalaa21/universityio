// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/index.css';
import Introducing from './pages/introducing';
import LoginSignup from './pages/LoginSignup';
import Inside from './pages/inside';
import Restart from './pages/restart';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Introducing />} />
        
        {/* Login and Sign Up route */}
        <Route path="/auth" element={<LoginSignup />} />

        {/* Inside route (after login) */}
        <Route path="/reset-password" element={<Restart />} />

        {/* Inside route (after login) */}
        <Route path="/inside" element={<Inside />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

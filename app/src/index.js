// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/index.css';
import App from './pages/app';
import LoginSignup from './pages/LoginSignup';
import Restart from './pages/restart';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<App />} />
        
        {/* Login and Sign Up route */}
        <Route path="/auth" element={<LoginSignup />} />

        {/* Inside route (after login) */}
        <Route path="/reset-password" element={<Restart />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

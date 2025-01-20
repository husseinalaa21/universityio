// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/index.css';
import App from './pages/app';
import LoginSignup from './pages/LoginSignup';
import Restart from './pages/restart';
import About from './pages/about';
import Policy from './pages/policy';
import Support from './pages/support';

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

        {/* Inside route  */}
        <Route path="/about" element={<About />} />

        {/* Inside route */}
        <Route path="/policy" element={<Policy />} />

        {/* Inside route */}
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

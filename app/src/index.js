// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './style/index.css';
import Introducing from './pages/introducing';
import Home from './pages/home';
import LoginSignup from './pages/LoginSignup';
import Restart from './pages/restart';
import About from './pages/about';
import Policy from './pages/policy';
import Support from './pages/support';
import ContactUs from './pages/contact';
import Faq from './pages/faq';
import User from './pages/user';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Introducing />} />

        {/* HOME PAGE */}
        <Route path="/home" element={<Home />} />

        {/* Login and Sign Up route */}
        <Route path="/auth" element={<LoginSignup />} />

        {/* Inside route (after login) */}
        <Route path="/reset-password" element={<Restart />} />

        {/* Inside routes */}
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/user" element={<User />} />

        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

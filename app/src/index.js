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

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />

        {/* HOME PAGE */}
        <Route path="/in" element={<Introducing />} />

        {/* Login and Sign Up route */}
        <Route path="/auth" element={<LoginSignup type={true}/>} />

        {/* Login and Sign Up route */}
        <Route path="/login" element={<LoginSignup type={true}/>} />

        {/* Login and Sign Up route */}
        <Route path="/signup" element={<LoginSignup type={false}/>} />

        {/* Inside route (after login) */}
        <Route path="/reset-password" element={<Restart />} />

        {/* Inside routes */}
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/faq" element={<Faq />} />

        {/* Redirect unknown paths to home */}
        <Route path="*" element={<Home replace />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

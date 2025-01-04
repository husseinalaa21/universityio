import React, { useState } from 'react';
import axios from 'axios';
import logo from '../logos/logo.png';
import '../style/main.css';

// Determine the API base URL
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://server.universityio.com';

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: '',
  });
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
      sex: '',
    }); // Reset form data
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date of birth
    if (!isLogin && calculateAge(formData.dateOfBirth) < 14) {
      setMessage('You must be at least 14 years old to sign up.');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const payload = isLogin
        ? { email: formData.email, pass: formData.password }
        : {
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            email: formData.email,
            pass: formData.password,
            sex: formData.sex,
          };

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (response.data.valid) {
        setMessage('Success! ' + (isLogin ? 'You are logged in.' : 'Your account has been created.'));
      } else {
        setMessage(response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      // Show error response from the server if available
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='login_signup'>
      <header className="main_header">
        <div className='logo-main'>
          <img className="logo" src={logo} alt="logo" />
        </div>
      </header>

      <div className='page_login_signup'>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Enter your date of birth"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="sex">Gender:</label>
                <select
                  id="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-enter Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />
            </div>
          )}
          <button type="submit" className="btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={toggleForm} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>

      <div className='end'>
        <section className="modern-footer">
          <div className="container">
            <p>&copy; 2025 University IO. All Rights Reserved.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginSignup;

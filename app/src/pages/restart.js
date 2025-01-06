import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../logos/logo.png';
import '../style/main.css';
import End from './end'
import Header from './header'

// Determine the API base URL
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://server.universityio.com';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Extract email and token from the URL
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (email && token) {
      setFormData((prev) => ({ ...prev, email, token }));
    } else {
      setMessage('Invalid or expired reset link.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Call the API to reset the password
      const response = await axios.post(`${API_BASE_URL}/new-password`, {
        email: formData.email,
        token: formData.token,
        newPassword: formData.newPassword,
      });

      setLoading(false);
      if (response.data.success) {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => navigate('/auth'), 3000);
      } else {
        setMessage(response.data.message || 'Failed to reset password.');
      }
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const form_input = (labelText, id, type, value, placeholder) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
      </div>
    );
  };

  return (
    <>
      <Header login={false} ask={false} />
      <div className="login_signup">

        <div className="page_login_signup">
          {loading && <p className="loading-message">Please wait...</p>}
          {message && <p className="message">{message}</p>}

          {formData.email && formData.token && (
            <>
              <h2>Reset Password</h2>
              <form onSubmit={handleSubmit}>
                {form_input('New Password', 'newPassword', 'password', formData.newPassword, 'Enter new password')}
                {form_input(
                  'Confirm New Password',
                  'confirmPassword',
                  'password',
                  formData.confirmPassword,
                  'Re-enter new password'
                )}
                <button type="submit" className="btn">
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <End />
    </>
  );
}

export default ResetPasswordPage;
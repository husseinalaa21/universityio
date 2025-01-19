import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import '../style/main.css';
import End from './end'
import Header from './header'

// Determine the API base URL
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://server.universityio.com';

function LoginSignup() {
  const navigate = useNavigate();
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
  const [isRest, setRest] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  var title = "University IO - login or sign up"
  useEffect(() => {
    document.title = title;
  }, [title]); // This effect will rerun whenever the title changes

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

  const toggleRest = () => {
    setRest(!isRest);
    if (isRest) {
      setIsLogin(true); // Show login/signup when reset is toggled off
    }
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

  const retryAxiosRequest = async (url, data, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        return response;
      } catch (error) {
        if (error.response?.status === 504 && attempt < retries) {
          console.warn(`Retrying request... Attempt ${attempt}`);
          continue;
        }
        throw error;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRest) {
      try {
        setLoading(true);
        const response = await retryAxiosRequest(`${API_BASE_URL}/restart`, {
          email: formData.email,
        });
        setLoading(false);
        if (response.data.success) {
          setMessage('Reset password link has been sent to your email.');
        } else {
          setMessage(response.data.message || 'An unexpected error occurred.');
        }
      } catch (error) {
        setLoading(false);
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred. Please try again later.');
        }
      }
      return;
    }

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
      setLoading(true);
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

      const response = await retryAxiosRequest(`${API_BASE_URL}${endpoint}`, payload);
      setLoading(false);

      if (response.data.valid) {
        setMessage(`Success! ${isLogin ? 'You are logged in.' : 'Your account has been created.'}`);

        Cookies.set('cookie', response.data.cookie, { expires: 7 }); // Set cookie to expire in 7 days
        Cookies.set('email', formData.email, { expires: 7 });
        setTimeout(() => navigate('/'), 3000);
      } else {
        setMessage(response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  // BLOCKS //
  const enterMessage = (m) => {
    return <div className='enter_message'>{m}</div>;
  };

  // Modified form_input to include a show/hide password toggle
  const form_input = (labelText, id, type, value, placeholder, isPassword = false) => {
    return (
      <div className="form-group">
        <label htmlFor={id}>{labelText}</label>
        <input
          type={showPassword && isPassword ? 'text' : type}
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className='login_signup'>
      <Header login={false} ask={false} />
      <div className='page_login_signup'>
        {loading && <p className="loading-message">Please wait...</p>}
        {!isRest && (
          <>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div className='inputs_group'>
                    {form_input('First Name', 'firstName', 'text', formData.firstName, 'Enter your first name')}
                    {form_input('Last Name', 'lastName', 'text', formData.lastName, 'Enter your last name')}
                  </div>
                  {form_input('Date of Birth', 'dateOfBirth', 'date', formData.dateOfBirth, 'Enter your date of birth')}
                  <div className="form-group">
                    <label htmlFor="sex">Gender</label>
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
              {form_input('Email', 'email', 'email', formData.email, 'Enter your email')}
              {form_input('Password', 'password', 'password', formData.password, 'Enter your password', true)}
              {!isLogin && form_input('Re-enter Password', 'confirmPassword', 'password', formData.confirmPassword, 'Re-enter your password', true)}
              <button type="submit" className="btn">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
          </>
        )}

        {isRest && (
          <>
            {enterMessage(
              'Please enter the email address associated with your account. If the email address is correct, an email will be sent. Please check Spam or other folders.'
            )}
            <form onSubmit={handleSubmit}>
              {form_input('Email', 'email', 'email', formData.email, 'Enter your email')}
              <button type="submit" className="btn">Submit</button>
            </form>
          </>
        )}

        {message && <p className="message">{message}</p>}
        {isLogin && (
          <div className='toggleAny'>
            <button onClick={toggleRest} className="toggle-btn-">
              {isRest ? 'Return to the login page' : 'Reset your password?'}
            </button>
          </div>
        )}
        {!isRest && (
          <div className='toggleAny'>
            {isLogin ? <p>Don't have an account?</p> : <p>Already have an account?</p>}
            <button onClick={toggleForm} className="toggle-btn">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </div>
        )}
      </div>
      <End />
    </div>
  );
}

export default LoginSignup;

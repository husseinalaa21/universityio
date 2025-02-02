import React, { useState } from 'react';
import axios from 'axios';

// SocialLink Component
const SocialLink = ({ platform, url, bgColor, logo }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="social-link"
      onClick={handleClick}
      style={{ borderCollapse: bgColor, color: bgColor }}
    >
      <img src={logo} className="social-logo" />
      {platform}
    </div>
  );
};

const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://server.universityio.com';

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
// Footer Component
const Footer = (props) => {
  const [isSend, setisSend] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    setisSend(true)
    try {
      const response = await retryAxiosRequest(`${API_BASE_URL}/mes`, formData);
      if (response.data.success) {
        setMessage('Your message has been sent to the developer. Please allow 1-2 days for a response.');
      } else {
        setMessage('Your message has been sent to the developer. Please allow 1-2 days for a response.' || 'An unexpected error occurred.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="footer-section">
      <section className="footer-container">
        {!props.login ?
          <div className="contact-section">
            <div className="developer-details">
              <h4>Contact the Developer</h4>
              <p>Have questions or feedback? Feel free to reach out:</p>
              {isSend ? <div className='message_sent'>{message}</div> :
                <form onSubmit={handleSubmit}
                >
                  <div className="input-group">
                    <label htmlFor="name" className="input-label">Your Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="email" className="input-label">Your Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="message" className="input-label">Your Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Enter your message"
                      className="textarea-field"
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">Send Message</button>
                </form>}
            </div>
          </div>
          : <></>}
          {props.ask?<>
          <div className="social-links">
            <SocialLink
              platform="Gmail"
              url="mailto:universityio.office@gmail.com"
              bgColor="#D44638" // Gmail Red
              logo="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
            />
            <SocialLink
              platform=" Hussein A. ( X ) "
              url="https://x.com/husseinalaa21/"
              bgColor="#333"
              logo="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
            />
            <SocialLink
              platform="LinkedIn"
              url="https://www.linkedin.com/company/university-io/"
              bgColor="#0077B5" // LinkedIn Blue
              logo="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            />
            <SocialLink
              platform="GitHub"
              url="https://github.com/husseinalaa21/"
              bgColor="#333" // GitHub Black
              logo="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            />
          </div></>:<></>}
        <div className="footer-bottom-section">
          <p className="footer-text">&copy; 2025 University IO. All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;

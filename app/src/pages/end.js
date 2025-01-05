import React from "react";

// SocialLink Component
const SocialLink = ({ platform, url, bgColor, logo }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="social-link"
      onClick={handleClick}
      style={{ borderCollapse: bgColor, color: bgColor}}
    >
      <img src={logo} className="social-logo" />
      {platform}
    </div>
  );
};

// ContactForm Component
const ContactForm = () => {
  return (
    <form
      action="mailto:universityio.office@gmail.com"
      method="POST"
      encType="multipart/form-data"
      className="contact-form"
    >
      <div className="input-group">
        <label htmlFor="name" className="input-label">Your Name:</label>
        <input
          type="text"
          id="name"
          name="name"
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
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-button">Send Message</button>
    </form>
  );
};

// Footer Component
const Footer = () => {
  return (
    <div className="footer-section">
      <section className="footer-container">
        <div className="contact-section">
          <div className="developer-details">
            <h4>Contact the Developer</h4>
            <p>Have questions or feedback? Feel free to reach out:</p>
            <ContactForm />
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
            </div>
          </div>
        </div>
        <div className="footer-bottom-section">
          <p className="footer-text">&copy; 2025 University IO. All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;

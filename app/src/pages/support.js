import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './header';
import End from './end';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [typeOfSupport, setTypeOfSupport] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setResponseMessage(`Thank you, ${name}. We have received your request regarding "${userMessage}" for ${typeOfSupport} support. We will contact you shortly at ${email}.`);
  };

  return (
    <>
      <Helmet>
        <title>University IO - Support</title>
        <meta name="description" content="Need assistance? Visit the University IO Support page for help with account issues, course inquiries, technical support, and more. Our team is here to ensure your experience is smooth and successful." />
      </Helmet>
      <Header login={false} ask={true} />
      <div className='support-page'>
        <div className='support-title'>
          <h1>Support</h1>
          <p>If you need assistance, please fill out the form below or you can also contact us directly via <a href="mailto:support@universityio.com">support@universityio.com</a>.</p>
        </div>
        <div className='support-container'>
          <div className='support-section'>
            <h2> Send Message form</h2>
            <p>At Universityio.com, we're dedicated to providing you with the best support to enhance your experience on our platform. Please let us know how we can assist you today.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='support-fields'>
              <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label>
                Email Address:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <label>
                Type of Support Needed:
                <select value={typeOfSupport} onChange={(e) => setTypeOfSupport(e.target.value)} required>
                  <option value="">--Please choose an option--</option>
                  <option value="Technical">Technical Support</option>
                  <option value="Account">Account Support</option>
                  <option value="Billing">Billing Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Message:
                <textarea value={userMessage} onChange={(e) => setUserMessage(e.target.value)} required />
              </label>
              <button type="submit">Submit</button>
            </div>
          </form>
          {responseMessage && <div className='response-message'>{responseMessage}</div>}
        </div>
      </div>
      <End login={true} ask={false} />
    </>
  );
};

export default Support;

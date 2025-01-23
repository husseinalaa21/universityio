import React, { useEffect } from 'react';
import Header from './header';
import End from './end';
import '../style/about.css';

const ContactUs = () => {
    const title = "University IO - Contact Us";

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <Header login={false} ask={true} />
            <div className='about_page'>
                <div className='title'>
                    <h1>Contact Us</h1>
                    <p>Have questions or need support? Reach out to us at University IO, and let us help you navigate your educational journey.</p>
                </div>
                <div className='container_about'>
                    <h2>Get In Touch</h2>
                    <p>
                        We're here to assist you with any queries you might have about our courses, teaching on our platform, or any other inquiries:
                        <ul>
                            <li>Email: <a href='mailto:support@universityio.com'>support@universityio.com</a></li>
                            <li>FAQ: <a href='/faq'>Visit our FAQ</a></li>
                            <li>Get Support: <a href='/support'> Support</a></li>
                        </ul>
                    </p>
                    <h2>Office Location</h2>
                    <p>This Platform currently running remotly without office location, soon will be an office.
                    </p>
                    <h2>Support Hours</h2>
                    <p>
                        Our team is available to help you during the following hours:
                        <br/>
                        Monday - Friday: 9 AM to 5 PM
                        <br/>
                        Saturday: 10 AM to 3 PM
                    </p>
                    <h2>Stay Connected</h2>
                    <p>
                        Follow us on our social media channels to stay updated on new courses, events, and more:
                        <br/>
                        LinkedIn: <a href='https://twitter.com/universityio'>@universityio</a>
                        <br/>
                        X: <a href='https://facebook.com/universityio'>University IO</a>
                    </p>
                </div>
            </div>
            <End login={false} ask={true} />
        </>
    );
};

export default ContactUs;

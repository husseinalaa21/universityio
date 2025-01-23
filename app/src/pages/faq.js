import React, { useEffect } from 'react';
import Header from './header';
import End from './end';
import '../style/about.css';

const FAQ = () => {
    const title = "University IO - FAQ";

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <Header login={false} ask={true} />
            <div className='about_page'>
                <div className='title'>
                    <h1>Frequently Asked Questions</h1>
                    <p>Find answers to common questions about University IO and our educational services.</p>
                </div>
                <div className='container_about'>
                    <h2>General Questions</h2>
                    <p>
                        <strong>How do I enroll in a course?</strong>
                        <br/>
                        You can enroll in courses by visiting the course page and clicking the 'Enroll' button. Make sure you are logged in to your account.
                    </p>
                    <p>
                        <strong>What payment methods are accepted?</strong>
                        <br/>
                        We accept all major credit cards, PayPal, and certain cryptocurrency payments.
                    </p>

                    <h2>Course Creation</h2>
                    <p>
                        <strong>How can I become an instructor?</strong>
                        <br/>
                        To become an instructor, register as an educator and submit your course proposal through our teaching dashboard. All courses undergo a review process to ensure quality standards.
                    </p>

                    <h2>Technical Support</h2>
                    <p>
                        <strong>I'm having trouble accessing my course. What should I do?</strong>
                        <br/>
                        Please contact our support team at <a href='mailto:support@universityio.com'>support@universityio.com</a>. Provide details of the problem, and we will assist you as soon as possible.
                    </p>

                    <h2>Account Management</h2>
                    <p>
                        <strong>How can I reset my password?</strong>
                        <br/>
                        You can reset your password by clicking the 'Forgot Password' link on the login page and following the instructions sent to your email.
                    </p>

                    <h2>Privacy and Security</h2>
                    <p>
                        <strong>How is my personal information protected?</strong>
                        <br/>
                        We prioritize your privacy with state-of-the-art security measures. For more details, please read our privacy policy linked at the bottom of each page.
                    </p>
                </div>
            </div>
            <End login={false} ask={true} />
        </>
    );
};

export default FAQ;
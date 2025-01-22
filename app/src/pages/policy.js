import React, { useEffect } from 'react';
import Header from './header';
import End from './end';
import '../style/about.css';

const Policy = () => {
    const title = "University IO - Terms of Use and Policy";

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <>
            <Header login={false} ask={true} />
            <div className='about_page'>
                <div className='title'>
                    <h1>{title}</h1>
                    <p>By accessing or using Universityio.com, you agree to be bound by these terms and conditions ("Terms"). Please read them carefully before using our services.</p>
                </div>
                <div className='container_about'>
                    <h2>Services</h2>
                    <p>Universityio.com provides an online platform where users can create, upload, manage, and enroll in educational courses ("Courses"). Our platform is designed to facilitate an interactive learning environment accessible globally.</p>

                    <h2>Fees and Payments</h2>
                    <p>Users set their own course prices. Universityio.com collects a 20% commission on each course sale to support platform operations. Transactions are securely processed on our system.</p>

                    <h2>Content</h2>
                    <p>Users retain ownership of their courses and associated content. By uploading content to our platform, users grant a non-exclusive, global license to us for distribution, promotion, and showcasing.</p>

                    <h2>Use of the Platform</h2>
                    <p>Users agree to not misuse the platform. This includes refraining from harassing others, distributing offensive content, or engaging in illegal activities.</p>

                    <h2>Account Termination and Suspension</h2>
                    <p>We reserve the right to suspend or terminate accounts if users violate our terms or engage in illegal or harmful activities.</p>

                    <h2>Modifications to Terms</h2>
                    <p>We may update these terms periodically. Users are encouraged to review the terms regularly to stay informed of their rights and responsibilities.</p>

                    <h2>Contact Us</h2>
                    <p>For any questions or concerns regarding these terms, please contact us at support@universityio.com.</p>
                </div>
            </div>
            <End login={false} ask={true} />
        </>
    );
};

export default Policy;
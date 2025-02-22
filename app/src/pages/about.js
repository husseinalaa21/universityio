import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from './header';
import End from './end';
import '../style/about.css';

const About = (props) => {
    return (
        <>
            <Helmet>
                <title>University IO - About US</title>
                <meta name="description" content="Discover the story behind University IO on our About Us page. Learn about our mission to empower learners and educators, our values, and how we’re transforming education for a brighter future." />
            </Helmet>
            <Header login={false} ask={true} />
            <div className='about_page'>
                <div className='title'>
                    <h1>About US</h1>
                    <p>Welcome to Universityio.com! Learn more about who we are, our mission, and how we work to provide the best educational experience possible.</p>                </div>
                <div className='container_about'>
                    <h2>Our Mission</h2>
                    <p>
                        At University IO, our mission is to democratize the educational landscape by providing a robust platform where expert educators can share their knowledge and learners can acquire new skills. We are committed to making high-quality education accessible and affordable to everyone, helping individuals achieve recognized certifications and advance their careers.
                    </p>
                    <h2>
                        Our Vision
                    </h2>
                    <p>                    We envision a future where education is boundary-less and available to anyone with the ambition to learn and the drive to succeed. University IO aims to be at the forefront of educational innovation, connecting learners and teachers in a dynamic, supportive, and enriching online environment.
                    </p>
                    <h2>                    Join Our Community
                    </h2>
                    <p>                    Whether you're looking to teach, learn, or both, University IO offers the tools and community to support your goals. Explore our diverse course offerings, upload your own educational content, or enroll in courses to begin your journey toward certification. Join us at University IO—where your potential is unlimited.
                    </p>
                    <h2>                    Explore and Connect
                    </h2>
                    <p>                    Ready to start your educational journey or share your knowledge with the world? <a href='https://www.universityio.com/auth'>Sign UP</a> to begin teaching today. For assistance or more information, please contact us at support@universityio.com.
                    </p>

                </div>
            </div>
            <End login={false} ask={true} />
        </>
    );
};
export default About;
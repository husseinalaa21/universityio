import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import End from './end';
import '../style/about.css';

const About = (props) => {

  var title = "University IO - About US"
  useEffect(() => {
    document.title = title;
  }, [title]); // This effect will rerun whenever the title changes

    return (
        <>
            <Header login={false} ask={!false} />
            <div className='about_page'>
                <div className='title'>
                    About US
                </div>
                <div className='continer'>
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
                    <p>                    Ready to start your educational journey or share your knowledge with the world? Visit our [Course Listings] to browse available courses or [Sign Up] to begin teaching today. For assistance or more information, please contact us at [Contact Information].
                    </p>

                </div>
            </div>
            <End login={false} ask={!false} />
        </>
    );
};
export default About;
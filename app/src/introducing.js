import React from 'react';
import './main.css';
import './introducing.css'

const App = () => {
  return (
    <>
      <div className='intro'>
        <title>Welcome to University IO - Empower Your Future</title>
        <section className="modern-intro">
          <div className="container">
            <h1>Welcome to University IO</h1>
            <p>Redefine your learning experience. Master programming, IT skills, and entrepreneurship with the most modern tools and strategies. Your future begins here.</p>
          </div>
        </section>
      </div>

      <section id="courses" className="courses modern-courses">
        <div className="container">
          <h2>Available Courses</h2>
          <div className="course-list">
            <div className="course-item">
              <div className='item-python item-shape'>
                <h3>Python Programming</h3>
                <p>Learn Python-3 the main language for programming AI</p>
              </div>
              <div className='item-learning-part-a item-shape'>
                <i className="fas fa-code"></i>
                <h3>Programming Essentials</h3>
                <p>Master the building blocks of programming with hands-on projects in Python, JavaScript, and more.</p>
              </div>
            </div>
            <div className="course-item item-shape">
              <i className="fas fa-laptop"></i>
              <h3>IT Skills Training</h3>
              <p>Gain in-demand skills to excel in today's tech-driven world.</p>
            </div>
            <div className="course-item">
              <div className='item-business item-shape'>
                <i className="fas fa-briefcase"></i>
                <h3>Business Development</h3>
                <p>Learn to innovate, plan, and execute your entrepreneurial vision with expert guidance.</p>
              </div>
              <div className='item-selling item-shape'>
                <h3> Selling </h3>
                <p> Learn how to sell online </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="comparison modern-comparison">
        <div className="container">
          <h2>Why Choose University IO?</h2>
          <div className="comparison-grid">
            <div className="feature">
              <h3>Expert Instructors</h3>
              <p><i className="fas fa-check-circle"></i> Learn from the best in the industry.</p>
            </div>
            <div className="feature">
              <h3>Flexible Learning</h3>
              <p><i className="fas fa-check-circle"></i> Study at your own pace, anytime, anywhere.</p>
            </div>
            <div className="feature">
              <h3>Affordable Pricing</h3>
              <p><i className="fas fa-check-circle"></i> Top-quality education at a fraction of the cost.</p>
            </div>
            <div className="feature">
              <h3>Community Support</h3>
              <p><i className="fas fa-check-circle"></i> Join a thriving community of learners and mentors.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default App;

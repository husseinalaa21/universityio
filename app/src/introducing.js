import React, { useRef, useState } from 'react';
import './main.css';
import './introducing.css'

import meteor from './svg/meteor-solid.svg'
import earth from './svg/earth-americas-solid.svg'
import business_logo from './svg/business-time-solid.svg'
import code_logo from './svg/code-solid.svg'
import computer_logo from './svg/computer-solid.svg'
import money_logo from './svg/money-bill-transfer-solid.svg'
import python_logo from './svg/python-brands-solid.svg'
import arrow_right from './svg/angle-right-solid.svg'
import arrow_left from './svg/angle-left-solid.svg'

const App = () => {
  var logo_size = '20px'
  const scrollContainerRef_a = useRef(null),
    scrollContainerRef_b = useRef(null);

  const [showLeftButton_a, setShowLeftButton_a] = useState(false);
  const [showLeftButton_b, setShowLeftButton_b] = useState(false);

  var scroll = (direction, part) => {
    const scrollAmount = 300; // Adjust the scroll distance as needed
    if (part.current) {
      if (direction === 'left') {
        part.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'right') {
        part.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleScroll_a = () => {
    if (scrollContainerRef_a.current) {
      const { scrollLeft } = scrollContainerRef_a.current;
      setShowLeftButton_a(scrollLeft > 0); // Show the left button if scrolled right
    }
  };
  const handleScroll_b = () => {
    if (scrollContainerRef_b.current) {
      const { scrollLeft } = scrollContainerRef_b.current;
      setShowLeftButton_b(scrollLeft > 0); // Show the left button if scrolled right
    }
  };


  var qa = (q, n) => {
    return <div className="Qa_in">
      <h3>{q}</h3>
      <p>{n}</p>
    </div>
  }

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
          <div className=' courses_head'>
            <h2>Available Courses</h2>
            <div className="Qa_controls">
              {showLeftButton_a && <button onClick={() => scroll('left', scrollContainerRef_a)}><img src={arrow_left} width='15px' /></button>}
              <button onClick={() => scroll('right', scrollContainerRef_a)}><img src={arrow_right} width='15px' /></button>
            </div>
          </div>
          <div className="course-list" ref={scrollContainerRef_a}
            onScroll={handleScroll_a}>
            <div className="course-item">
              <div className='item-python item-shape'>
                <div className='item-logo'>
                  <img src={python_logo} width={logo_size} />
                  <h3>Python Programming</h3>
                </div>
                <p>Learn Python-3 the main language for programming AI</p>
              </div>
              <div className='item-learning-part-a item-shape'>
                <div className='item-logo'>
                  <img src={code_logo} width={logo_size} />
                  <h3>Programming Essentials</h3>
                </div>
                <p>Master the building blocks of programming with hands-on projects in Python, JavaScript, and more.</p>
              </div>
            </div>
            <div className="course-item item-shape">
              <div className='item-logo'>
                <img src={computer_logo} width={logo_size} />
                <h3>IT Skills Training</h3>
              </div>
              <p>Gain in-demand skills to excel in today's tech-driven world.</p>
            </div>
            <div className="course-item">
              <div className='item-business item-shape'>
                <div className='item-logo'>
                  <img src={business_logo} width={logo_size} />
                  <h3>Business Development</h3>
                </div>
                <p>Learn to innovate, plan, and execute your entrepreneurial vision with expert guidance.</p>
              </div>
              <div className='item-selling item-shape'>
                <div className='item-logo'>
                  <img src={money_logo} width={logo_size} />
                  <h3> Selling </h3>
                </div>
                <p> Learn how to sell online </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='join'>
        <div className='join_back_a'>
          <img src={earth} width='200px' className='earth'></img>
        </div>
        <div className='join_back_b'>
          <img src={meteor} width='30px' className='meteor'></img>
        </div>
        <h2>Step Into Your Future with University IO</h2>
        <p>Take the leap today. Sign up and start your journey to success.</p>
        <div className='btn-group'>
          <div className="btn-primary"> Sign UP </div>
          <div className="btn-primary-"> Login </div>
        </div>

      </section>


      <section className="Qa_uio">
        <div className='Qa_head_group'>
          <h2>Why Choose University IO?</h2>
          <div className="Qa_controls">
            {showLeftButton_b && <button onClick={() => scroll('left', scrollContainerRef_b)}><img src={arrow_left} width='15px' /></button>}
            <button onClick={() => scroll('right', scrollContainerRef_b)}><img src={arrow_right} width='15px' /></button>
          </div>
        </div>
        <div className="Qa_group" ref={scrollContainerRef_b} onScroll={handleScroll_b}>
          {qa('Expert Instructors', 'Learn from the best in the industry.')}
          {qa('Flexible Learning', 'Study at your own pace, anytime, anywhere.')}
          {qa('Affordable Pricing', 'Top-quality education at a fraction of the cost.')}
          {qa('Community Support', 'Join a thriving community of learners and mentors.')}
        </div>
      </section>
    </>
  );
};
export default App;

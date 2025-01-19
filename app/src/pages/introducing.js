import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import '../style/introducing.css'

import meteor from '../svg/meteor-solid.svg'
import earth from '../svg/earth-americas-solid.svg'
import business_logo from '../svg/business-time-solid.svg'
import code_logo from '../svg/code-solid.svg'
import computer_logo from '../svg/computer-solid.svg'
import money_logo from '../svg/money-bill-transfer-solid.svg'
import python_logo from '../svg/python-brands-solid.svg'
import arrow_right from '../svg/angle-right-solid.svg'
import arrow_left from '../svg/angle-left-solid.svg'
import liberay_one from '../svg/liberay_one.jpg'
import liberay_two from '../svg/liberay_two.jpg'
import liberay_three from '../svg/liberay_three.jpg'

// Import SVG files
import ChalkboardUser from '../svg/chalkboard-user-solid.svg';
import LinesLeaning from '../svg/lines-leaning-solid.svg';
import School from '../svg/school-solid.svg';
import Chalkboard from '../svg/chalkboard-solid.svg';
import Leanpub from '../svg/leanpub-brands-solid.svg';
import check_double from '../svg/check-double-solid.svg';

const Intro = () => {
  var logo_size = '20px'
  const scrollContainerRef_a = useRef(null),
    scrollContainerRef_b = useRef(null);

  const [showLeftButton_a, setShowLeftButton_a] = useState(false);
  const [showLeftButton_b, setShowLeftButton_b] = useState(false);
  const animeData = [
    { title: 'How do I purchase courses?', text: 'Buy with a single payment and access forever.' },
    { title: 'Can I sell my own courses?', text: 'Yes, reach a global audience on our platform.' },
    { title: 'What do I earn from completing courses?', text: 'Receive a recognized degree upon completion.' },
    { title: 'Are there any recurring fees?', text: 'No, pay once for lifelong access to your courses.' }
  ];
  const [animeTitle, setAnimeTitle] = useState(animeData[0].title);
  const [animeText, setAnimeText] = useState(animeData[0].text);
  const [newDate, setNewDate] = useState(formatTime());
  const [index, setIndex] = useState(0);
  const liberay_img = '200px'

  const icons = [
    <img src={LinesLeaning} alt="Lines Leaning" className="filtered-icon" key="1" />,
    <img src={School} alt="School" className="filtered-icon" key="2" />,
    <img src={Chalkboard} alt="Chalkboard" className="filtered-icon" key="3" />,
    <img src={Leanpub} alt="Leanpub" className="filtered-icon" key="4" />,
  ];

  // State for the current icon index CLOSE
  const [currentIconIndex, setCurrentIconIndex] = useState(0);


  function formatTime() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedTime = hours + ':' + minutes + ' ' + ampm;
    return formattedTime;
  }

  useEffect(() => {
    document.title = "University IO - buy or sell online courses";
    const interval = setInterval(() => {
      const newIndex = (index + 1) % animeData.length;
      setAnimeTitle(animeData[newIndex].title); // Update the title first
      setAnimeText('..'); // Update the text after 1 second

      setTimeout(() => {
        setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length); // Cycle through icons CLOSE
        setAnimeText(animeData[newIndex].text); // Update the text after 1 second
        setNewDate(formatTime())
      }, 1000);

      setIndex(newIndex); // Update the index to keep track of the current item
    }, 3000); // Move to the next item every 3 seconds

    return () => clearInterval(interval);
  }, [icons.length, index, animeData]);

  var scroll = (direction, part) => {
    const scrollAmount = 300;
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
      setShowLeftButton_a(scrollLeft > 0);
    }
  };
  const handleScroll_b = () => {
    if (scrollContainerRef_b.current) {
      const { scrollLeft } = scrollContainerRef_b.current;
      setShowLeftButton_b(scrollLeft > 0);
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
        <div className='web_intro'>
          <title>Welcome to University IO - Empower Your Future</title>
          <section className="modern-intro">
            <div className="container">
              <div className='continer_titile'>
                <h1>Welcome to University IO</h1>
                <div>
                  Learn New Skills.
                </div>
              </div>
              <p>Redefine your learning experience. Master programming, IT skills, and entrepreneurship with the most modern tools and strategies. Your future begins here.</p>
            </div>
          </section>
          <section className='anime'>
            <div className='anime_title'>Support</div>
            <div className='anime_tap'>
              <div className='anime_header'>
                {animeTitle}
                <div className='info_message_anime'><img src={check_double} width="12px"></img><p className='time_nn'>{newDate}</p></div>

              </div>
              <div className='anime_continer'>
                {animeText}
                <div className='info_message_anime'><img src={check_double} width="12px"></img><p className='time_nn'>{newDate}</p></div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='liberay'>
          <div className='liberay_title'>
            Do more in one <mark>Place.</mark>..
          </div>
          <div className='liberay_container'>
            <div className='liberay_card'>
              <div className='liberay_card_title'>
                Publish your courses
              </div>
              <div className='liberay_card_img'>
                <img src={liberay_one} width={liberay_img}></img>
              </div>
            </div>

            <div className='liberay_card'>
              <div className='liberay_card_title'>
                buy courses
              </div>
              <div className='liberay_card_img'>
                <img src={liberay_two} width={liberay_img}></img>
              </div>
            </div>

            <div className='liberay_card'>
              <div className='liberay_card_title'>
                Search for courses
              </div>
              <div className='liberay_card_img'>
                <img src={liberay_three} width={liberay_img}></img>
              </div>
            </div>
          </div>
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

      {/**<section className='join'>
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

      </section>**/}


      <section className="Qa_uio">
        <div className='Qa_head_group'>
          <h2>Benefits </h2>
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
export default Intro;

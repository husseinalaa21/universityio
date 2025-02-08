import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../style/introducing.css'
import '../style/main.css';
import Header from './header';
import End from './end';
import cc from '../pages/cc'
import Loading from '../pages/loading.js'

import business_logo from '../svg/business-time-solid.svg'
import code_logo from '../svg/code-solid.svg'
import computer_logo from '../svg/computer-solid.svg'
import money_logo from '../svg/money-bill-transfer-solid.svg'
import python_logo from '../svg/python-brands-solid.svg'
import arrow_right from '../svg/angle-right-solid.svg'
import arrow_left from '../svg/angle-left-solid.svg'
import california_ from '../svg/california.jpg'
import california_t from '../svg/california_2.jpg'
import california_a from '../svg/california_3.jpg'
import cookies from '../svg/cookie-bite-solid.svg'
import x from '../svg/x-solid.svg'
import arrow_up from '../svg/arrow-up-right-from-square-solid.svg'

import briefcase from '../svg/x/briefcase-solid.svg'
import certificate from '../svg/x/certificate-solid.svg'
import money from '../svg/x/money-bill-solid.svg'
import pen from '../svg/x/pen-to-square-solid.svg'
import plus from '../svg/x/plus-solid.svg'
import user from '../svg/x/user-plus-solid.svg'
import chart from '../svg/x/chart-line-solid.svg'


// Import SVG files
import LinesLeaning from '../svg/lines-leaning-solid.svg';
import School from '../svg/school-solid.svg';
import Chalkboard from '../svg/chalkboard-solid.svg';
import Leanpub from '../svg/leanpub-brands-solid.svg';
import check_double from '../svg/check-double-solid.svg';

const Intro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [lc, setLc] = useState([
    "", "", "", "", "", ""
  ])

  const scrollContainerRef_a = useRef(null)

  const [showLeftButton_a, setShowLeftButton_a] = useState(false);
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

  const [showCookiesBanner, setShowCookiesBanner] = useState(true);
  const handleAcceptCookies = () => {
    setShowCookiesBanner(false);
    localStorage.setItem('cookiesAccepted', 'true');
  };

  useEffect(() => {
    if (localStorage.getItem('cookiesAccepted')) {
      setShowCookiesBanner(false);
    }
  }, []);

  const liberay_img = '200px'
  var logo_size = '20px'

  const icons = [
    <img src={LinesLeaning} alt="Lines Leaning" className="filtered-icon" key="1" />,
    <img src={School} alt="School" className="filtered-icon" key="2" />,
    <img src={Chalkboard} alt="Chalkboard" className="filtered-icon" key="3" />,
    <img src={Leanpub} alt="Leanpub" className="filtered-icon" key="4" />,
  ];

  // State for the current icon index CLOSE
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [cin_lc, setCin_lc] = useState(0);

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
    // COOKIE CHECK
    if (!isLoading) {
      cc()
        .then((e) => {
          if (e.s === true) {
            navigate("/home", { replace: true });
          } else {
            setIsLoading(true);
          }
        })
        .catch(() => {
          setIsLoading(true);
        });
    }

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

    }, 1000);


    const in_lc = setInterval(() => {
      // Randomly update the lc array
      setLc((prevLc) => {
        const newLc = prevLc.map(() => ""); // Set all elements to empty string
        newLc[cin_lc] = "slc"; // Set the random index to "slc"
        newLc[cin_lc - 1] = "_slc"; // Set the random index to "slc"
        newLc[cin_lc + 1] = "slc_"; // Set the random index to "slc"
        if (5 > cin_lc) {
          setCin_lc(cin_lc + 1)
        } else {
          setCin_lc(0)
        }
        return newLc;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(in_lc);
    };
  }, [animeData, icons, isLoading, cin_lc]); // Keep dependencies minimal

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

  var qa = (q, n) => {
    return <div className="Qa_in">
      <h3 className='qn_driver'>{q}</h3>
      <p className='qn_patch'>{n}</p>
    </div>
  }

  return (
    <>
      <Helmet>
        <title>University IO - buy or sell online courses</title>
        <meta name="description" content="Explore new skills or teach your own at University IO. Start learning or sharing your expertise in programming, IT, and entrepreneurship today." />
      </Helmet>

      {isLoading ? <>
        <Header login={false} ask={true} pic="https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

        {showCookiesBanner && (
          <div className="cookies-banner">
            <div className='cct' onClick={handleAcceptCookies}><img src={x} width='16px' /></div>
            <h2> <img src={cookies} width='23px' /> Cookies Used </h2>
            <p>This website uses cookies to enhance user experience. By continuing to browse, you agree to our use of cookies.</p>
            <button onClick={handleAcceptCookies} className='accept_cookie'>Accept and close</button>
          </div>
        )}
        <div className='intro'>
          <div className='web_intro'>
            <title> University IO: Learn, Teach, Succeed - Your Gateway to Skills and Opportunities </title>
            <section className="modern-intro">
              <div className="container">
                <div className='continer_titile'>
                  <h1> Buy or Sell <mark>Online</mark> Courses </h1>
                  <div className='bio_main'>
                    <div> Learn New Skills. </div>
                    <div> Or sell your courses. </div>
                  </div>
                </div>
                <p>Learn new skills or teach your own in programming, IT, and entrepreneurship. Advance your career or empower others at University IO. Begin your journey today!</p>
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
              <div className='anime_butt' onClick={() => navigate('/signup')}>
                <div className='anime_butt_signup' > Join our community  </div>
                <div className='anime_butt_svg'><img src={arrow_up} width="16px" /></div>
              </div>
            </section>
          </div>
          <div className='wild_intro'>
            <section className='chicago_intro'>
              <div className='chicago_images'>
                <img src={california_a} alt='First' className='fade-left' />
                <img src={california_} alt='Second' className='center-image' />
                <img src={california_t} alt='Third' className='fade-right' />
              </div>
            </section>

            <section className='california_intro'>
              <div className='ca_title'>
                <h2>Explore New <mark>Ways</mark> to <mark>Teach</mark></h2>
                <p> #Teach #Learn #Earn </p>
              </div>
              <div className='ca_bio'>
                <p>Discover innovative methods to share your knowledge and inspire learners worldwide. Whether you're an expert in programming, IT, business, or any field, this is your platform to create, publish, and sell courses. Empower others, grow your influence, and redefine teaching in the digital age. </p>
              </div>
            </section>
          </div>
        </div>
        <div className="library">
          <div className="liberay_title">
            Do more in one <mark>Place.</mark>..
          </div>

          <div className="library-container">
            {/* Certificate Feature */}
            <div className={`library-item ${lc[0]}`}>
              <div className="library-icon">
                <img src={certificate} alt="Certificate Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Earn Certificates</h3>
                <p>Get a certificate upon finishing the course.</p>
              </div>
            </div>

            {/* Activity Verification */}
            <div className={`library-item ${lc[1]}`}>
              <div className="library-icon">
                <img src={chart} alt="Verification Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Activity Verification</h3>
                <p>People can watch your activities to verify course completion.</p>
              </div>
            </div>

            {/* Teaching Feature */}
            <div className={`library-item ${lc[2]}`}>
              <div className="library-icon">
                <img src={briefcase} alt="Teaching Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Teach Your Courses</h3>
                <p>If you are a teacher, you can share your knowledge with others.</p>
              </div>
            </div>

            {/* Free Course Upload */}
            <div className={`library-item ${lc[3]}`}>
              <div className="library-icon">
                <img src={plus} alt="Upload Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Upload Courses for Free</h3>
                <p>Share your courses without any cost.</p>
              </div>
            </div>

            {/* Selling Courses */}
            <div className={`library-item ${lc[4]}`}>
              <div className="library-icon">
                <img src={money} alt="Selling Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Sell Your Courses</h3>
                <p>Monetize your courses and reach a wider audience.</p>
              </div>
            </div>

            {/* Community Learning */}
            <div className={`library-item ${lc[5]}`}>
              <div className="library-icon">
                <img src={user} alt="Community Icon" width="22px" />
              </div>
              <div className="library-content">
                <h3>Learn with a Community</h3>
                <p>Engage with other learners and improve your skills together.</p>
              </div>
            </div>
          </div>
        </div>


        <section id="courses" className="courses modern-courses">
          <div className="container">
            <div className=' courses_head'>
              <h2>Courses You Can Enroll In</h2>
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
            <h2> Sell Or Buy Courses </h2>
          </div>
          <div className="Qa_group">
            <p className='qa_p'> Whether you're selling your courses or looking to purchase courses, University IO offers this feature to you completely free of charge. </p>
            {qa('Expert Instructors', 'Learn from the best in the industry.')}
            {qa('Flexible Learning', 'Study at your own pace, anytime, anywhere.')}
            {qa('Affordable Pricing', 'Top-quality education at a fraction of the cost.')}
            {qa('Community Support', 'Join a thriving community of learners and mentors.')}
          </div>
        </section>
        <End login={false} ask={true} />
      </> : <Loading />}
    </>
  );
};
export default Intro;

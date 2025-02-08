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
import quote from '../svg/quote-left-solid.svg'
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

import py_ from '../svg/courses/py.jpg'
import py_guy from '../svg/courses/py_guy.jpg'
import trading_ from '../svg/courses/trading.jpg'
import trading_guy from '../svg/courses/trading_.jpg'
import chicago_ from '../svg/courses/chicago.jpg'
import chicago_guy from '../svg/courses/chicago_.jpg'
import ai_ from '../svg/courses/ai.jpg'
import work_out_ from '../svg/courses/work_out.jpg'
import work_out_guy from '../svg/courses/work_out_.jpg'
import it_ from '../svg/courses/it.jpg'
import it_guy from '../svg/courses/it_guy.jpg'

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
    }, 800);
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


  const CourseNew = ({ title, instructor, price, description, backgroundImage, logo, tags, trade }) => {
    return (
      <div className='hussein'>
        <div className='item-shape' style={{ backgroundImage: `linear-gradient(to left, rgba(29, 88, 239, 0.28) 50%, rgba(4, 30, 65, 0.8) 100%), url(${backgroundImage})` }}>
          <div className='item-logo'>
            <img src={logo} alt={`${title} logo`} />
          </div>
          <div className='item_logo_title'>
            <h3><mark>#{trade}</mark> {title}</h3>
            <h4>By <mark>@{instructor}</mark></h4>
            <p><mark>${price}</mark> {description}</p>
            <div className='tags'>
              {tags.map((tag, index) => (
                <div key={index} className={`tag_ tag_${tag.toLowerCase().replace(/\s+/g, '_')}`}>#{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                    University IO platform
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


        <section id="explore" className="courses">
          <div className='courses_head'>
            <h2>Explore <mark>Courses</mark></h2>
            <div className="Qa_controls">
              {/*showLeftButton_a && <button onClick={() => scroll('left', scrollContainerRef_a)}><img src={arrow_left} width='15px' /></button>*/}
              {/*<button onClick={() => scroll('right', scrollContainerRef_a)}><img src={arrow_right} width='15px' /></button>*/}
            </div>
          </div>
          {/*<div className="course-list" ref={scrollContainerRef_a}
            onScroll={handleScroll_a}>*/}
          <div className="course-list">
            <div className='courses_message'>
              <img src={quote} width='18px' />
              Note: This section showcases example courses, and the platform is currently under development.
            </div>
            {/* Python Programming Course */}
            <CourseNew
              title="Python Programming"
              instructor="harry_21"
              price={249}
              description="Python3 Full Course"
              backgroundImage={py_}
              logo={py_guy}
              tags={["New", "Python", "Finish in 8 weeks"]}
              trade={1}
            />

            {/* IT Skills Training Course */}
            <CourseNew
              title="IT Skills Training"
              instructor="dan_em"
              price={179}
              description="Gain in-demand skills to excel in today's tech-driven world."
              backgroundImage={it_}
              logo={it_guy}
              tags={["New", "IT Skills", "Finish in 4 weeks"]}
              trade={2}
            />

            {/* Selling Online Course */}
            <CourseNew
              title="Selling Online"
              instructor="tom_cruze"
              price={149}
              description="Learn how to sell online and grow your e-commerce business."
              backgroundImage={chicago_}
              logo={chicago_guy}
              tags={["New", "Selling", "Finish in 5 weeks"]}
              trade={3}
            />

            {/* Trading Skills Course */}
            <CourseNew
              title="Trading Skills"
              instructor="sam_leo"
              price={299}
              description="Master the art of trading and learn strategies to succeed in financial markets."
              backgroundImage={trading_}
              logo={trading_guy}
              tags={["New", "Trading", "Finish in 6 weeks"]}
              trade={4}
            />

            {/* Workout Mastery Course */}
            <CourseNew
              title="Workout Mastery"
              instructor="jimmy_ba"
              price={99}
              description="Get fit and healthy with expert-guided workout plans and nutrition tips."
              backgroundImage={work_out_}
              logo={work_out_guy}
              tags={["New", "Workout", "Finish in 8 weeks"]}
              trade={5}
            />
          </div>
        </section>

        <End login={false} ask={true} />
      </> : <Loading />}
    </>
  );
};
export default Intro;

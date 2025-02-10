import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import logo from '../logos/logo.png';
import axios from 'axios';
import caret_down from '../svg/caret-down-solid.svg'
import caret_up from '../svg/caret-up-solid.svg'; // Make sure you have this image
import homeIcon from '../svg/house-solid.svg'
import bell_solid from '../svg/bell-solid.svg';
import fire_solid from '../svg/fire-solid.svg'
import moon_regular from '../svg/moon-regular.svg'
import moon_solid from '../svg/moon-solid.svg'


function Header({ ask, login, pic, fetchDataForKey, io, cookie_log }) {
    const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://server.universityio.com';

    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [isNight, setIsNight] = useState(true)

    const [showList, setShowList] = useState(false); // State to control the visibility of the "More" list

    const toggleList = () => {
        setShowList(prev => !prev); // Toggle the visibility of the list
    };

    // State to track page type
    const location = useLocation();
    const [pageLocated, setPageLocated] = useState({
        isAbout: false,
        isSupport: false,
        isPolicy: false,
        isHome: false,
        isFaq: false,
        isContact: false
    });

    // Effect to update state based on current pathname
    useEffect(() => {
        const path = location.pathname;

        // Update state based on the current path
        setPageLocated({
            isAbout: path.includes('/about'),
            isSupport: path.includes('/support'),
            isPolicy: path.includes('/policy'),
            isFaq: path.includes('/faq'),
            isContact: path.includes('/contactus'),
            isHome: path === '/'  // Check if the pathname exactly matches '/'
        });
    }, [location]); // Dependency on location to run effect when it changes

    const toggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    const toggleOptions_advance = () => {
        if (showOptions) {
            setShowOptions(false)
        }
    };


    const logout = () => {

        axios.post(`${API_BASE_URL}/home/logout`, {}, { withCredentials: true }) // Ensure proper credentials
            .then(response => {

                if (response.status === 200) {
                    window.location.reload();
                } else {
                    alert("Error ....")
                }
            })
            .catch(error => {
                console.error('Error fetching cookie:', error);
            });
    }

    return (
        <>
            <header className="main_header" onClick={toggleOptions_advance}>
                <div className='logo-main' onClick={() => navigate('/', { replace: true })}>
                    <img className="logo" src={logo} alt="logo" />
                </div>

                {login ?
                    <>
                        {!ask && (
                            <div className='pn'>
                                <div onClick={() => fetchDataForKey('notifications', cookie_log.cookie, cookie_log.email, false, "co")} className={`notifications_icon_top ${io.notifications ? 'active_ntop' : ''}`}>
                                    <img src={bell_solid} alt="bell_solid" width='16px' />
                                </div>
                                <div className='picure_header' onClick={toggleOptions}>
                                    <img src={pic} alt="Profile" />
                                </div>
                            </div>
                        )}
                    </>
                    : ask ?
                        <div className='header_intro'>
                            <div className='header-ask'>
                                <div className='header-login' onClick={() => navigate('/login')} > Login </div>
                                <div className='header-signup' onClick={() => navigate('/signup')}> Sign Up </div>
                            </div>
                        </div> : null}
                {/**isNight ? <div className='night_on'> <img src={moon_solid} width='20px'></img></div> : <div className='night_off'></div>**/}
                {showOptions && (
                    <div className='dropdown_menu'>
                        <div onClick={() => navigate('/profile')}>Profile</div>
                        <div onClick={() => navigate('/settings')}>Settings</div>
                        <div onClick={logout}>Logout</div>
                    </div>
                )}
            </header>
            {ask ?
                <div className='panel'> <div className='basic_panel'>
                    {!pageLocated.isHome && <div className='main_header_selected' onClick={() => navigate('/')}> <img src={homeIcon} width='20px' /> </div>}
                    <div className={pageLocated.isAbout ? 'header_selected' : ''} onClick={() => navigate('/about')} > About US </div>
                    <div className={pageLocated.isSupport ? 'header_selected' : ''} onClick={() => navigate('/support')}> Support </div>
                    <div className={pageLocated.isFaq ? 'header_selected' : ''} onClick={() => navigate('/faq')}> FAQ </div>
                </div>
                    <div className='right_panel'>
                        <a className='explore_courses explore_web' href="#explore"> Explore Courses </a>
                        <div className='panel_more' onClick={toggleList}> More <img src={showList ? caret_up : caret_down} width='10px' alt="Toggle" /> </div>
                    </div>
                </div> : null}
            {showList && (
                <div className="dropdown_content">
                    <div className="dropdown_section">
                        <div onClick={() => navigate('/policy')}>Terms and conditions</div>
                        <div onClick={() => navigate('/policy')}>FAQ</div>
                        <div onClick={() => navigate('/contactus')}>Contact Us</div>
                        <div onClick={() => navigate('/support')}>Get Support</div>
                    </div>
                    <div className="dropdown_section">
                        <div onClick={() => navigate('/login')}>Log in</div>
                        <div onClick={() => navigate('/signup')}>Create Account</div>
                    </div>
                    <div className="dropdown_section">
                        <div onClick={() => window.location.href = "https://www.linkedin.com/company/university-io/"} target="_blank" rel="noopener noreferrer">LinkedIn</div>
                        <div onClick={() => window.location.href = "https://x.com/husseinalaa21/"} target="_blank" rel="noopener noreferrer">Twitter</div>
                        <div onClick={() => window.location.href = "mailto:universityio.office@gmail.com"} target="_blank" rel="noopener noreferrer">Email</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
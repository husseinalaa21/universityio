import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import logo from '../logos/logo.png';
import caret_down from '../svg/caret-down-solid.svg'
import caret_up from '../svg/caret-up-solid.svg'; // Make sure you have this image
import fire_solid from '../svg/fire-solid.svg'
import moon_regular from '../svg/moon-regular.svg'
import moon_solid from '../svg/moon-solid.svg'
import Cookies from 'js-cookie';

function Header(props) {
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
        isHome: false  // Added isHome state
    });

    // Effect to update state based on current pathname
    useEffect(() => {
        const path = location.pathname;

        // Update state based on the current path
        setPageLocated({
            isAbout: path.includes('/about'),
            isSupport: path.includes('/support'),
            isPolicy: path.includes('/policy'),
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
        Cookies.remove('cookie');
        Cookies.remove('email');
        // Refresh the page to clear any user state
        window.location.reload();
    }

    return (
        <>
            <header className="main_header" onClick={toggleOptions_advance}>
                <div className='logo-main'>
                    <img className="logo" src={logo} alt="logo" />
                </div>

                {props.login ?
                    <>
                        {!props.ask && (
                            <div className='picure_header' onClick={toggleOptions}>
                                <img src={props.pic} alt="Profile" style={{ width: '100%', height: '100%' }} />
                            </div>
                        )}
                    </>
                    : props.ask ?
                        <div className='header_intro'>
                            <div className='header-ask'>
                                <div
                                    className='header-login'
                                    onClick={() => navigate('/auth')}
                                >
                                    Login
                                </div>
                                <div
                                    className='header-signup'
                                    onClick={() => navigate('/auth')}
                                >
                                    Sign Up
                                </div>
                            </div>
                            <div className='panel'>
                                <div className='panel_web'>
                                    {/* add here if it was scroll down make the logo visable */}
                                    {/* Make this if the page was diffrent than the home make home button visable */}
                                    <div onClick={() => navigate('/auth')}> <mark>Join</mark> today for free </div>
                                </div>
                                {!pageLocated.isHome && <div onClick={() => navigate('/')}> Main Page </div>}
                                <div className={pageLocated.isAbout ? 'header_selected' : ''} onClick={() => navigate('/about')} > About US </div>
                                <div className={pageLocated.isSupport ? 'header_selected' : ''} onClick={() => navigate('/support')}> Support </div>

                                <div className='panel_more' onClick={toggleList}>
                                    More <img src={showList ? caret_up : caret_down} width='10px' alt="Toggle" />
                                </div>                        </div>
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
            {showList && (
                <div className="dropdown_content">
                    <div className="dropdown_section">
                        <div onClick={() => navigate('/policy')}>Terms and conditions</div>
                        <div onClick={() => navigate('/contactus')}>Contact Us</div>
                        <div onClick={() => navigate('/support')}>Get Support</div>
                    </div>
                    <div className="dropdown_section">
                        <div onClick={() => navigate('/auth/login')}>Log in</div>
                        <div onClick={() => navigate('/auth/register')}>Create Account</div>
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
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import logo from '../logos/logo.png';
import caret_down from '../svg/caret-down-solid.svg'
import fire_solid from '../svg/fire-solid.svg'
import moon_regular from '../svg/moon-regular.svg'
import moon_solid from '../svg/moon-solid.svg'
import Cookies from 'js-cookie';

function Header(props) {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [isNight, setIsNight] = useState(true)
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
                                {pageLocated.isHome? <div onClick={() => navigate('/auth')}> <mark>Join</mark> today for free </div> : <div onClick={ () => navigate('/')}> Main Page </div>}
                            </div>
                            <div className={pageLocated.isAbout ? 'header_selected' : ''} onClick={() => navigate('/about')} > About US </div>
                            <div className={pageLocated.isSupport ? 'header_selected' : ''} onClick={() => navigate('/support')}> Support </div>
                            <div className='panel_more'> More <img src={caret_down} width='10px'></img>  </div>
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
    );
}

export default Header;
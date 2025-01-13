import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import logo from '../logos/logo.png';
import Cookies from 'js-cookie';

function Header(props) {
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(prev => !prev);
    };

    const toggleOptions_advance = () => {
        if(showOptions){
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
                    </div> : null}
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
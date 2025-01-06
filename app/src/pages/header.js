import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/main.css';
import logo from '../logos/logo.png';

function Header(props) {
    const navigate = useNavigate();
    return (
        <header className="main_header">
            <div className='logo-main'>
                <img className="logo" src={logo} alt="logo" />
            </div>

            {props.login ?
                <></>
                // MEANS NOT LOGIN ASK FOR (LOGIN/SIGN UP) IF NO MEAN ADD SOMTHING ELSE
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
                </div>: <></>}
        </header>
    );
}

export default Header;
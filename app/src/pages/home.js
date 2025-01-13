import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/home.css';
// Import necessary images
import courseIcon from '../svg/book-solid.svg';
import searchIcon from '../svg/seach-icon.svg';
import profileIcon from '../svg/user-solid.svg';

function Home() {
    const [io, setIo] = useState({
        course: true,
        search: false,
        profile: false
    });
    const [db, setDb] = useState({});
    const [isLogin, setIsLogin] = useState(false);

    const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://server.universityio.com';

    useEffect(() => {
        const cookie = Cookies.get('cookie');
        const email = Cookies.get('email');

        if (cookie && email && !isLogin) {
            fetchDataForKey('course'); // Default view when logged in
        }
    }, [isLogin]);

    const containerChange = (key) => {
        const newStates = {
            course: false,
            search: false,
            profile: false
        };
        newStates[key] = true;
        setIo(newStates);
        fetchDataForKey(key);
    };

    const fetchDataForKey = (key) => {
        const cookie = Cookies.get('cookie');
        const email = Cookies.get('email');

        if (cookie && email) {
            axios.post(`${API_BASE_URL}/home/${key}`, { email, cookie })
                .then(response => {
                    if (response.status === 200) {
                        setDb(response.data);
                    } else {
                        Cookies.remove('cookie');
                        Cookies.remove('email');
                        setIsLogin(false);
                    }
                })
                .catch(error => {
                    console.error(`Error fetching ${key} data:`, error);
                    Cookies.remove('cookie');
                    Cookies.remove('email');
                    setIsLogin(false);
                });
        }
    };

    return (
        <div className='home_page'>
            <div className='home_header'>
                <div onClick={() => containerChange('course')} className={`container_change ${io.course ? 'active' : ''}`}>
                    <img src={courseIcon} alt="Course" width='18px' />
                </div>
                <div onClick={() => containerChange('search')} className={`container_change ${io.search ? 'active' : ''}`}>
                    <img src={searchIcon} alt="Search" width='18px' />
                </div>
                <div onClick={() => containerChange('profile')} className={`container_change ${io.profile ? 'active' : ''}`}>
                    <img src={profileIcon} alt="Profile" width='18px' />
                </div>
            </div>
            <div className='container'>
                {io.course && <div className='course_container'>Course content: {JSON.stringify(db)}</div>}
                {io.search && <div className='search_container'>Search results: {JSON.stringify(db)}</div>}
                {io.profile && <div className='profile_container'>Profile info: {JSON.stringify(db)}</div>}
            </div>
        </div>
    );
}

export default Home;

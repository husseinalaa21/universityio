import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../style/home.css';
// Import necessary images
import courseIcon from '../svg/book-solid.svg';
import searchIcon from '../svg/seach-icon.svg';
import profileIcon from '../svg/user-solid.svg';
import comments_regular from '../svg/message-solid.svg';
import note_img from '../svg/quote-left-solid.svg';

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
        document.title = "University IO - Home";
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

    const container_course = () => {
        console.log(db.courses_has)
        try {
            return <div>
                <div className='container_home'>
                    <div className='ch_a'>
                        <div className='ch_a_note'>
                            <img src={note_img} width='18px' />
                        </div>
                        <div className='ch_a_comment'>
                            Find your courses here—whether they're courses you've purchased or courses you've created.
                        </div>
                    </div>
                    <div className='ch_b'>
                        <div className='ch_b_top_head'>
                            <div>{db.courses_has.hasOwnProperty()} course you have.</div>
                            <div>
                                sort A-Z
                            </div>
                        </div>
                        
                        <div className=''>                            
                        </div>
                    </div>
                </div>
            </div>
        } catch {
            return "The developer is working hard to solve this issue"
        }
    }

    return (
        <>
            <Helmet>
                <title>University IO - Home</title>
                <meta name="description" content="Explore new skills or teach your own at University IO. Start learning or sharing your expertise in programming, IT, and entrepreneurship today." />
            </Helmet>
            <div className='home_page'>
                <div className='home_header_pck'>
                    <div className='home_header'>
                        <div className='home_header_pack_one'>
                            <div onClick={() => containerChange('course')} className={`container_change ${io.course ? 'active' : ''}`}>
                                <img src={courseIcon} alt="Course" width='18px' />
                            </div>
                            <div onClick={() => containerChange('profile')} className={`container_change ${io.profile ? 'active' : ''}`}>
                                <img src={profileIcon} alt="Profile" width='18px' />
                            </div>
                            <div onClick={() => containerChange('search')} className={`container_change ${io.search ? 'active' : ''}`}>
                                <img src={searchIcon} alt="Search" width='18px' />
                            </div>
                        </div>
                        <div className='home_header_pack_two'>
                            <div onClick={() => containerChange('profile')} className={`container_change ${io.profile ? 'active' : ''}`}>
                                <img src={comments_regular} alt="Profile" width='23px' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    {io.course && <div className='course_container'>{container_course()}</div>}
                    {io.search && <div className='search_container'>Search results: {JSON.stringify(db)}</div>}
                    {io.profile && <div className='profile_container'>Profile info: {JSON.stringify(db)}</div>}
                </div>
            </div>
        </>
    );
}

export default Home;

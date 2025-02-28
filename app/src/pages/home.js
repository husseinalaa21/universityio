import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import '../style/home.css';
import '../style/course.css';
import cc from '../pages/cc.js'
import Header from './header';
import End from './end';
import Loading from '../pages/loading.js'
// Import necessary images
import courseIcon from '../svg/book-solid.svg';
import houseIcon from '../svg/house-solid.svg'
import searchIcon from '../svg/seach-icon.svg';
import profileIcon from '../svg/user-solid.svg';
import comments_regular from '../svg/message-solid.svg';
import bell_solid from '../svg/bell-solid.svg';
import hippo_solid from '../svg/shield-dog-solid.svg';

// CONTAINERS FOR HOME PAGE
import Course from './containers/course.js';
import Profile from './containers/profile.js';
import Search from './containers/search.js';
import Lookup from './containers/lookup.js';
import Messages from './containers/messages.js';
import Settings from './containers/settings.js';
import Edit_course from './containers/edit_course.js';

function Home() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [db, setDb] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [cr, setCr] = useState(true)
    const [user, setUser] = useState({
        picture: "",
        name: ""
    })
    const [cookie_log, setCookie_log] = useState({
        cookie: "",
        email: "",
        username: ""
    })
    const [login, setLogin] = useState(false)
    const [title, setTitle] = useState("Home")
    const [io, setIo] = useState({
        course: false,
        search: false,
        profile: true,
        messages: false,
        lookup: false,
        settings: false,
        notifications: false,
        setup_course: false,
        edit_course: false
    });

    const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://server.universityio.com';

    // set current URL
    var cu = ``
    // TYPE OF DATA FOR THIS SECTION
    // DATA FOR INSIDE THE SECTION - ALLOW
    // FRONT - BACK (SAME / SAME) BUT DIFFRENT BUT STILL SAME!
    var di = [
        "user",
        "add",
        "delete",
        "buy",
        "teach",
        "learn"
    ]
    const [url_v, setUrl_v] = useState("")
    const [url_inside, setUrl_inside] = useState("")

    // Important to set defult view so can't get error ?nr=0 = null and not able to try
    function reload_() {
        var num_reload = searchParams.get('nr');
        num_reload = Number(num_reload)
        if (num_reload < 3) {
            setTimeout(() => {
                navigate(`${cu}&nr=${num_reload + 1}`);
                window.location.reload();
            }, 1000);
        } else if (num_reload >= 3) {
            navigate('/in', { replace: true });
        } else {
            setTimeout(() => {
                navigate(`${cu}&nr=0`);
                window.location.reload();
            }, 1000);
        }
    }

    const fetchDataForKey = (key, cookie, email, inside, vi) => {
        if (cr) {
            const newStates = {
                course: false,
                search: false,
                profile: false,
                messages: false,
                settings: false,
                lookup: false,
                setup_course: false
            };
            newStates[key] = true;
            setCr(false)
            setIo(newStates);

            axios.post(`${API_BASE_URL}/home/${key}`, { email, cookie, inside: inside, vi })
                .then(response => {
                    if (response.status === 200) {
                        setIsLoading(true);
                        var dd = response.data
                        setDb(dd.data);
                        setUser({
                            picture: dd.profile_image || profileIcon,
                            name: dd.firstName
                        })
                        if (dd.api_inside !== false && dd.api_inside !== "false" && dd.api_inside !== undefined) {
                            cu = `/?type=${key}&${dd.api_inside}=${dd.api_v}`;
                            setUrl_v(vi)
                        } else {
                            cu = `/?type=${key}`;
                        }
                        setUrl_inside(inside)
                        setTitle(`${key}`)
                        if (key == "profile") {
                            setTitle(`${dd.data.firstName} ${dd.data.lastName}`)
                            cu = `/${dd.data.username}`;
                        }
                        if (key == "lookup") {
                            setTitle(`${dd.data.firstName} ${dd.data.lastName}`)
                            cu = `/${dd.data.username}`;
                        }
                        navigate(cu);
                        setCr(true)
                    } else {
                        navigate('/in', { replace: true });
                    }
                })
                .catch(error => {
                    navigate('/in', { replace: true });
                });
        }
    };

    useEffect(() => {
        // Function to handle the popstate event (back/forward navigation)
        const handlePopState = () => {
            window.location.reload(); // Reload the page
        };

        // Add event listener for popstate
        window.addEventListener('popstate', handlePopState);

        // Your existing logic
        if (!isLoading) {
            cc()
                .then(e => {
                    if (e.s === true) {
                        // TRUE LOGIN
                        setCookie_log({
                            cookie: e.c,
                            email: e.m
                        });
                        setLogin(true)
                        const urlType = searchParams.get('type');
                        // CHECK IF LOOKING FR USER // KEY IN THIS CASE WILL BE "lookup"
                        const url = window.location.href;
                        const segments = url.split('/');
                        const username = segments[segments.length - 1];
                        if (urlType == undefined && username !== "undefined" && username.length > 0) {
                            fetchDataForKey("lookup", e.c, e.m, false, username);
                            return true
                        }
                        if (urlType && io.hasOwnProperty(urlType)) {
                            for (let i = 0; i < di.length; i++) {
                                const ii = di[i];
                                const iii = searchParams.get(ii);
                                if (iii) {
                                    return fetchDataForKey(urlType, e.c, e.m, ii, iii);
                                }
                            }
                            fetchDataForKey(urlType, e.c, e.m, false, "");
                        } else {
                            fetchDataForKey('profile', e.c, e.m, false, "");
                        }
                    } else {
                        setLogin(false)
                        // Function to handle the popstate eve
                        // Extract the dynamic segment (e.g., "hussein")
                        const url = window.location.href;
                        const segments = url.split('/');
                        const username = segments[segments.length - 1];
                        if (username.length > 0) {
                            fetchDataForKey("lookup", false, false, false, username);
                            return true
                        }

                        navigate('/in', { replace: true });
                    }
                })
                .catch(error => {
                    console.error('Error in cc() fetch:', error);
                    navigate('/in', { replace: true });
                });
        }

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isLoading, searchParams, navigate]);

    // RENDER MAIN HOME
    return (
        <>
            <Helmet>
                <title>University IO - {title}</title>
                <meta name="description" content="Explore new skills or teach your own at University IO. Start learning or sharing your expertise in programming, IT, and entrepreneurship today." />
            </Helmet>

            {isLoading ? <>
                <Header login={login} ask={false} pic={user.picture} io={io} fetchDataForKey={fetchDataForKey} cookie_log={cookie_log} />
                <div className='home_page'>
                    {login ?
                        <div className='home_header_pck'>
                            <div className='home_header'>
                                <div className='home_header_pack_one'>
                                    <div onClick={() => fetchDataForKey('course', cookie_log.cookie, cookie_log.email, false, "")} className={`container_change homeicon ${io.course ? 'active' : ''}`}>
                                        <img src={houseIcon} alt="Course" width='16px' />
                                    </div>
                                    <div onClick={() => fetchDataForKey('profile', cookie_log.cookie, cookie_log.email, false, "")} className={`container_change ${io.profile ? 'active' : ''}`}>
                                        <img src={profileIcon} alt="Profile" width='16px' />
                                    </div>
                                    <div onClick={() => fetchDataForKey('search', cookie_log.cookie, cookie_log.email, false, "")} className={`container_change ${io.search ? 'active' : ''}`}>
                                        <img src={searchIcon} alt="Search" width='16px' />
                                    </div>
                                    <div onClick={() => fetchDataForKey('notifications', cookie_log.cookie, cookie_log.email, false, "")} className={`container_change notifications_icon_bottom ${io.notifications ? 'active' : ''}`}>
                                        <img src={bell_solid} alt="bell_solid" width='16px' />
                                    </div>
                                </div>
                                <div className='home_header_pack_two'>
                                    <div onClick={() => fetchDataForKey('messages', cookie_log.cookie, cookie_log.email, false, "")} className={`container_change ${io.messages ? 'active' : ''}`}>
                                        <img src={comments_regular} alt="messages" width='18px' />
                                    </div>
                                </div>
                            </div>
                        </div> : <div className='sign_offer'>
                            <p><img src={hippo_solid} width='22px' /> Login or <mark>Join</mark> University IO </p>
                            <div className='offer'>
                                <div className='so_login' onClick={() => navigate('/login')} > Login </div> OR <div className='so_signup' onClick={() => navigate('/signup')}> Sign Up </div>
                            </div>
                            <div className='sign_bott'>Visit <a href='/in'>Main Page</a> for more information.</div>
                        </div>}
                    {cr ?
                        <div className='container'>
                            {io.course && <Course
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={user.picture}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                                url_inside={url_inside}
                            />}
                            {io.lookup && <Lookup
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                            {io.search && <Search
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                            {io.profile && <Profile
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                            {io.messages && <Messages
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                            {io.settings && <Settings
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                            {io.edit_course && <Edit_course
                                db={db}
                                setDb={setDb}
                                cookie_log={cookie_log}
                                fetchDataForKey={fetchDataForKey}
                                API_BASE_URL={API_BASE_URL}
                                profileIcon={profileIcon}
                                url_v={url_v}
                                setUrl_v={setUrl_v}
                            />}
                        </div> : <div className='cr'></div>}
                </div>
                <End login={true} ask={false} />
            </> : <Loading />}
        </>
    );
}

export default Home;

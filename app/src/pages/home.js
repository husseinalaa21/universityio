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
import pic_edit from '../svg/pen-to-square-solid.svg'
import pic_bug from '../svg/bug-solid.svg'
import cover_pic from '../svg/file-image-solid.svg'
import join_pic from '../svg/calendar-days-solid.svg'
import link_pic from '../svg/link-solid.svg'
import location_pic from '../svg/location-dot-solid.svg'
import upload_solid from '../svg/upload-solid.svg'
import x_solid from '../svg/x-solid.svg'

function Home() {
    const [io, setIo] = useState({
        course: true,
        search: false,
        profile: false,
        messages: false
    });
    const [db, setDb] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [chicago, setChicago] = useState('course');
    const [edit, setEdit] = useState(false)
    const [cookie_log, setCookie_log] = useState({
        cookie: "",
        email: ""
    })
    const [edit_info_message, setEdit_info_message] = useState(false)

    const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://server.universityio.com';

    useEffect(() => {
        document.title = "University IO - Home";
        const cookie = Cookies.get('cookie');
        const email = Cookies.get('email');

        if (cookie && email && !isLogin) {
            setCookie_log({
                cookie: cookie,
                email: email
            })
            fetchDataForKey('course'); // Default view when logged in
        }
    }, [isLogin]);

    const containerChange = (key) => {
        const newStates = {
            course: false,
            search: false,
            profile: false,
            messages: false,
            settings: false
        };
        newStates[key] = true;
        setIo(newStates);
        fetchDataForKey(key);
    };

    const removeLogin = () => {
        Cookies.remove('cookie');
        Cookies.remove('email');
        setCookie_log({
            cookie: "",
            email: ""
        })
        setIsLogin(false);
    }

    const fetchDataForKey = (key) => {
        const cookie = cookie_log.cookie;
        const email = cookie_log.email;

        if (cookie && email) {
            axios.post(`${API_BASE_URL}/home/${key}`, { email, cookie })
                .then(response => {
                    if (response.status === 200) {
                        setDb(response.data);
                    } else {
                        removeLogin()
                    }
                })
                .catch(error => {
                    console.error(`Error fetching ${key} data:`, error);
                    removeLogin()
                });
        }
    };

    // CONTAINER FUNCTIONS ..

    const bug_send = (er) => {
        return <div className='error_container'> <img src={pic_bug} width='18px' /> Error Code: {er}. Our development team has been notified and is working to resolve this issue as soon as possible. Thank you for your patience! </div>
    }

    const container_course = () => {
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
                            {bug_send('110')}
                        </div>
                    </div>
                </div>
            </div>
        } catch {
            return bug_send('110')
        }
    }

    const change_chicago = (cc) => {
        if (cc == "degree") {
            setChicago("degree")
        } else if (cc == "course") {
            setChicago("course")
        } else if (cc == "activates") {
            setChicago("activates")
        }
    }

    const chicago_con = () => {
        if (chicago == "degree") {
            return ""
        } else if (chicago == "course") {

        } else if (chicago == "activates") {

        }
    }

    const chicago_date = (dd) => {
        const date = new Date(dd);

        // Format the date to only show the date portion
        const formattedDate = date.toLocaleDateString();
        return formattedDate
    }

    const [edit_info, setEdit_info] = useState({
        firstName: "",
        lastName: "",
        username: "",
        location: "",
        link: "",
        bio: "",
        picture: "",
        cover: ""
    })

    const submitChanges = (d) => {
        // check info
        const checkText = (t, l) => {
            if (t.length <= l) {
                return true
            }
            return false
        }
        if (checkText(edit_info.firstName, 0) || checkText(edit_info.lastName, 0) || checkText(edit_info.username, 0)) {
            setEdit_info_message(<div className='edit_faild'> Please enter vaild information </div>)
            return false
        }
        // SEND REQUEST
        const cookie = cookie_log.cookie;
        const email = cookie_log.email;

        if (cookie && email) {
            axios.post(`${API_BASE_URL}/home/edit_profile`, { email, cookie, edit_info: edit_info })
                .then(response => {
                    if (response.status === 200) {
                        setDb(response.data);
                        setEdit_info_message(<div className='edit_succ'> Successful saved the changes. </div>)
                    } else {
                        setEdit_info_message(<div className='edit_faild'> Failed to save the data, Please try again later. </div>)
                    }
                })
                .catch(error => {
                    setEdit_info_message(<div className='edit_faild'> Failed to save the data, Please try again later. </div>)
                });
        }
    }
    const handleChange = (e) => {
        setEdit_info({ ...edit_info, [e.target.id]: e.target.value });
    };
    const setEdit_fun = (s, v) => {
        if (s == true) {
            setEdit(true)
            setEdit_info(v)
        } else {
            setEdit(false)
        }
    }
    const container_profile = () => {
        try {
            var firstName = db.firstName,
                lastName = db.lastName,
                username = db.username,
                bio = db.bio,
                picure = db.profile_image,
                cover = db.cover,
                link = db.link,
                location = db.location

            // Picures SRCs
            if (picure == undefined || picure.length <= 0) {
                picure = profileIcon
            }
            if (cover == undefined || cover.length <= 0) {
                cover = cover_pic
            }
            if (bio == undefined || bio.length <= 0) {
                bio = "No bio"
            }
            if (location == undefined || location.length <= 0) {
                location = " No available"
            }
            if (link == undefined || link.length <= 0) {
                link = "No Link Attached"
            }
            if (edit) {
                return <div>
                    <div className='edit_profile'>
                        <div className='edit_profile_header'>
                            <div className='exit_editor' onClick={() => setEdit_fun(false)}> Exit </div>
                            <div className='save_editor' onClick={() => submitChanges()}> Save </div>
                        </div>
                        {edit_info_message}
                        <div className='edit_profile_container'>
                            <div className='cover_edit'>
                                <div className='_cover_edit_'>
                                    <img src={upload_solid} width="18px" />
                                </div>
                                <div className='_cover_edit'>
                                    <img src={cover} width="40px"></img>
                                </div>
                            </div>
                            <div className='profile_pic_edit'>
                                <div className='_pic_edit_'>
                                    <img src={upload_solid} width="18px" />
                                </div>
                                <div className='_pic_edit'>
                                    <img src={picure} width="40px"></img>
                                </div>
                            </div>
                            <div className='input_edit_group'>
                                <div className='input_edit_'>
                                    <label>First Name</label>
                                    <input
                                        type={'text'}
                                        id="firstName"
                                        value={edit_info.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='input_edit_'>
                                    <label>Last Name</label>
                                    <input
                                        type={'text'}
                                        id="lastName"
                                        value={edit_info.lastName}
                                        onChange={handleChange}
                                        //placeholder={placeholder}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='input_edit_ input_edit_ind'>
                                <label>username</label>
                                <input
                                    type={'text'}
                                    value={edit_info.username}
                                    id="username"
                                    onChange={handleChange}
                                    //placeholder={placeholder}
                                    required
                                />
                            </div>
                            <div className='input_edit_ input_edit_ind'>
                                <label>Bio</label>
                                <input
                                    type={'text'}
                                    value={edit_info.bio}
                                    id="bio"
                                    onChange={handleChange}
                                    //placeholder={placeholder}
                                    required
                                />
                            </div>
                            <div className='input_edit_ input_edit_ind'>
                                <label>Location</label>
                                <input
                                    type={'text'}
                                    value={edit_info.location}
                                    id="location"
                                    onChange={handleChange}
                                    //placeholder={placeholder}
                                    required
                                />
                            </div>
                            <div className='input_edit_ input_edit_ind'>
                                <label>Link</label>
                                <input
                                    type={'text'}
                                    value={edit_info.link}
                                    id="link"
                                    onChange={handleChange}
                                    //placeholder={placeholder}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            return <div>
                <div className='profile_main'>
                    <div className='profile_main_info'>
                        <div className='pic_and_title'>
                            <div className='conver_pic'>
                                <img src={cover} width='18px' />
                            </div>
                            <div className='profile_pic'>
                                <div className='pic_pic'>
                                    <img src={picure} width='18px' />
                                </div>
                                <div className='pic_edit' onClick={() => setEdit_fun(true, {
                                    firstName: db.firstName,
                                    lastName: db.lastName,
                                    username: db.username,
                                    bio: db.bio,
                                    picure: db.profile_image,
                                    cover: db.cover,
                                    link: db.link,
                                    location: db.location
                                })}>
                                    <img src={pic_edit} width='18px' /> Edit profile
                                </div>
                            </div>
                            <div className='username_and_discription'>
                                <div className='name_co_'>{firstName}{lastName}</div>
                                <div className='username_con_'>@{username}</div>
                                <div className='description_con_'>{bio}</div>
                            </div>
                            <div className='info_chicago'>
                                <div>
                                    <img src={location_pic} width='14px' /> {location}
                                </div>
                                <div>
                                    <img src={join_pic} width='14px' /> Joined {chicago_date(db.join)}
                                </div>
                            </div>
                            <div className='info_chicago_'>
                                <img src={link_pic} width='14px' /> {link}
                            </div>
                        </div>
                        <div className='chicago_bar'>
                            <div onClick={() => change_chicago("course")} className={chicago == "course" && "chicago_bar_selected"}>
                                Courses
                            </div>
                            <div onClick={() => change_chicago("degree")} className={chicago == "degree" && "chicago_bar_selected"}>
                                Degrees
                            </div>
                            <div onClick={() => change_chicago("activates")} className={chicago == "activates" && "chicago_bar_selected"}>
                                Activates
                            </div>
                        </div>
                    </div>

                    <div className='profile_main_con'>
                        {chicago_con()}
                    </div>
                </div>
            </div>
        } catch {
            return bug_send('210')
        }
    }

    const container_search = () => {
        return ""
    }

    const container_messages = () => {
        return ""
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
                            <div onClick={() => containerChange('messages')} className={`container_change ${io.messages ? 'active' : ''}`}>
                                <img src={comments_regular} alt="messages" width='18px' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    {io.course && <div className='course_container'>{container_course()}</div>}
                    {io.search && <div className='search_container'>{container_search()}</div>}
                    {io.profile && <div className='profile_container'>{container_profile()}</div>}
                    {io.messages && <div className='messages_container'>{container_messages()}</div>}
                </div>
            </div>
        </>
    );
}

export default Home;

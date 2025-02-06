import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import '../style/home.css';
import cc from '../pages/cc.js'
import Header from './header';
import End from './end';
import Loading from '../pages/loading.js'
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

// Backgrounds For Profile
import bp_0 from '../backgrounds_profile/0.jpg'
import bp_1 from '../backgrounds_profile/1.jpg'
import bp_2 from '../backgrounds_profile/2.jpg'
import bp_3 from '../backgrounds_profile/3.jpg'
import bp_4 from '../backgrounds_profile/4.jpg'
import bp_5 from '../backgrounds_profile/5.jpg'
import bp_6 from '../backgrounds_profile/6.jpg'
import bp_7 from '../backgrounds_profile/7.jpg'
import bp_8 from '../backgrounds_profile/8.jpg'
import bp_9 from '../backgrounds_profile/9.jpg'

// Array of cover images
const bps = [bp_0, bp_1, bp_2, bp_3, bp_4, bp_5, bp_6, bp_7, bp_8, bp_9];
// Randomly select a cover image from the bps array
const randomIndex = Math.floor(Math.random() * bps.length); // Generate a random index
const randombps = bps[randomIndex]

function Home() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        picture: "",
        name: ""
    })
    const [cookie_log, setCookie_log] = useState({
        cookie: "",
        email: "",
        username: ""
    })

    const [cr, setCr] = useState(true)
    const [io, setIo] = useState({
        course: false,
        search: false,
        profile: true,
        messages: false,
        lookup: false,
        settings: false
    });
    const [db, setDb] = useState({});
    const [chicago, setChicago] = useState('course');
    const [search_container, setSearch_container] = useState("")
    const [edit, setEdit] = useState(false)
    const [edit_info_message, setEdit_info_message] = useState(false)

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
        "buy"
    ]

    const [api_url, setApi_url] = useState({
        api_inside: "",
        api_v: ""
    })

    const fetchDataForKey = (key, cookie, email, inside, vi) => {
        // Important to set defult view so can't get error ?nr=0 = null and not able to try
        cu = `?type=${key}`

        function reload_() {
            var num_reload = searchParams.get('nr');
            num_reload = Number(num_reload)
            if (num_reload < 3) {
                setTimeout(() => {
                    navigate(`${cu}&nr=${num_reload + 1}`);
                    window.location.reload();
                }, 1000);
            } else if (num_reload >= 3) {
                navigate('/', { replace: true });
            } else {
                setTimeout(() => {
                    navigate(`${cu}&nr=0`);
                    window.location.reload();
                }, 1000);
            }
        }
        if (cr) {
            const newStates = {
                course: false,
                search: false,
                profile: false,
                messages: false,
                settings: false,
                lookup: false
            };
            newStates[key] = true;
            setIo(newStates);
            setCr(false)

            axios.post(`${API_BASE_URL}/home/${key}`, { email, cookie, inside: inside, vi })
                .then(response => {
                    if (response.status === 200) {
                        var dd = response.data
                        setDb(dd.data);
                        setUser({
                            picture: dd.profile_image || profileIcon,
                            name: dd.firstName
                        })
                        setApi_url({
                            api_inside: dd.api_inside,
                            api_v: dd.api_v
                        })
                        if (dd.api_inside !== false) {
                            cu = `?type=${key}&${dd.api_inside}=${dd.api_v}`
                        } else {
                            cu = `?type=${key}`
                        }
                        navigate(`${cu}`);
                        setCr(true)
                    } else {
                        cu = `?type=${key}`
                        navigate(`${cu}`);
                        setCr(true)
                        //reload_()
                    }
                })
                .catch(error => {
                    reload_()
                });
        }
    };

    useEffect(() => {
        if (!isLoading) {
            cc()
                .then(e => {
                    if (e.s === true) {
                        setIsLoading(true);
                        setCookie_log({
                            cookie: e.c,
                            email: e.m
                        });

                        const urlType = searchParams.get('type');
                        if (urlType && io.hasOwnProperty(urlType)) {
                            for (let i = 0; i < di.length; i++) {
                                const ii = di[i];
                                const iii = searchParams.get(ii);
                                if (iii) {
                                    fetchDataForKey(urlType, e.c, e.m, ii, iii);
                                    return;
                                }
                            }
                            fetchDataForKey(urlType, e.c, e.m, false, "Ds");
                        } else {
                            fetchDataForKey('profile', e.c, e.m, false, "Ds");
                        }
                    } else {
                        navigate('/', { replace: true });
                    }
                })
                .catch(error => {
                    console.error('Error in cc() fetch:', error);
                    navigate('/', { replace: true });
                });
        }
    }, [isLoading, searchParams, navigate]);


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
        picture: "",
        cover: "",
        profile_image: ""
    })

    const submitChanges = () => {
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
        var cookie = cookie_log.cookie;
        var email = cookie_log.email;

        if (cookie && email) {
            axios.post(`${API_BASE_URL}/home/edit_profile`, { email, cookie, edit_info: edit_info })
                .then(response => {
                    if (response.status === 200) {
                        setDb(response.data);
                        setEdit_info_message(<div className='edit_succ'> Successful saved the changes. </div>)
                    } else {
                        setEdit_info_message(<div className='edit_faild'> {response.message} </div>)
                    }
                })
                .catch(error => {
                    setEdit_info_message(<div className='edit_faild'> {error.response.data.message || 'An error occurred.'}</div>);
                });
            setTimeout(() => {
                setEdit_info_message("")
            }, 2000);
        }
    }
    var frozen_ = false


    const handleChange = async (e) => {
        if (frozen_) {
            setEdit_info_message(<div className='edit_faild'> Image upload failed 303</div>);
            return
        }
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            frozen_ = true
            if (file) {
                const formData = new FormData();
                formData.append("image", file); // Append the file
                formData.append("email", cookie_log.email); // Append email
                formData.append("cookie", cookie_log.cookie); // Append cookie
                formData.append("type", [e.target.id]); // Append Which One cover/profile_image

                try {
                    const response = await axios.post(`${API_BASE_URL}/home/upload`, formData, {
                        headers: { "Content-Type": "multipart/form-data" }
                    });

                    if (response.status === 200) {
                        frozen_ = false
                        const imageUrl = response.data.imageUrl;
                        setEdit_info_message(<div className='edit_succ'> Successfully update the picture.</div>);
                        setEdit_info({ ...edit_info, [e.target.id]: imageUrl });
                    } else {
                        frozen_ = false
                        setEdit_info_message(<div className='edit_faild'> Image upload failed 101</div>);
                    }
                } catch (error) {
                    frozen_ = false
                    setEdit_info_message(<div className='edit_faild'> Image upload failed 202</div>);
                }
            }
        } else {
            setEdit_info({ ...edit_info, [e.target.id]: e.target.value });
        }
    };

    const setEdit_fun = (s, v) => {
        if (s == true) {
            setEdit_info(v)
            setEdit(true)
        } else {
            fetchDataForKey('profile', cookie_log.cookie, cookie_log.email)
            setEdit(false)
        }
    }
    const container_profile = () => {
        try {
            var firstName = db.firstName,
                lastName = db.lastName,
                username = db.username,
                bio = db.bio,
                profile_image = db.profile_image,
                cover = db.cover,
                link = db.link,
                location = db.location;

            // INFO REPLACE-CHECK
            if (profile_image == undefined || profile_image.length <= 0) {
                profile_image = profileIcon
            }
            if (cover == undefined || cover.length <= 0) {
                cover = randombps // Assign the randomly selected cover to `cover`
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
                                    <label htmlFor="cover">
                                        <img src={upload_solid} width="18px" />
                                    </label>
                                    <input
                                        type="file"
                                        id="cover"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className='_cover_edit'>
                                    <img src={edit_info.cover || cover} width="40px"></img>
                                </div>
                            </div>
                            <div className='profile_pic_edit'>
                                <div className='_pic_edit_'>
                                    <label htmlFor="profile_image">
                                        <img src={upload_solid} width="18px" />
                                    </label>
                                    <input
                                        type="file"
                                        id="profile_image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                                <div className='_pic_edit'>
                                    <img src={edit_info.profile_image || profile_image} width="40px"></img>
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
                                <img src={cover} />
                            </div>
                            <div className='profile_pic'>
                                <div className='pic_pic'>
                                    <img src={profile_image} />
                                </div>
                                <div className='pic_edit' onClick={() => setEdit_fun(true, {
                                    firstName: db.firstName,
                                    lastName: db.lastName,
                                    username: db.username,
                                    bio: db.bio || "",
                                    profile_image: db.profile_image || "",
                                    cover: db.cover || "",
                                    link: db.link || "",
                                    location: db.location || "",
                                    files_pictures: edit_info.files_pictures
                                })}>
                                    <img src={pic_edit} width='18px' /> Edit profile
                                </div>
                            </div>
                            <div className='username_and_discription'>
                                <div className='name_co_'>{firstName} {lastName}</div>
                                <div className='username_con_'>@{username}</div>
                                <div className='description_con_'>{bio}</div>
                            </div>
                            <div className='chicago_mine'>
                                <div className='info_chicago'>
                                    <div>
                                        <img src={location_pic} width='14px' /> {location}
                                    </div>
                                    <div>
                                        <img src={join_pic} width='14px' /> Joined {chicago_date(db.join)}
                                    </div>
                                </div>
                                <div className='info_chicago_'>
                                    {db.link ? <><img src={link_pic} width='14px' /> <a href={link} target="_blank"> {link.slice(0, 200) + '...'} </a></> : <><img src={link_pic} width='14px' /> {link}</>}
                                </div>
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

    const hcs = (e) => {
        setSearch_container(e.target.value)
        setApi_url({ ...api_url, "api_v": e.target.value })
    }

    const lookup = () => {
        var isNoResul = false
        if (!db || db.email == undefined || db.profile_image == undefined) {
            // SEND NORMAL PAGE - GLOBAL SHIT
            isNoResul = true
        }
        // SEND USER PAGE
        // CHECK IF SAME SAME
        if (db.email == cookie_log.email) {
            // PREPARED FOR RETURNED TO THE PROFILE SECTION
            fetchDataForKey('profile', cookie_log.cookie, cookie_log.email, "", "")
            return true
        }
        var firstName = db.firstName,
            lastName = db.lastName,
            username = db.username,
            bio = db.bio,
            profile_image = db.profile_image,
            cover = db.cover,
            link = db.link,
            location = db.location;
        return <>
            {isNoResul ? <> No User Found! </> :
                <div className="search_suggestions">
                    <div className='profile_main'>
                        <div className='profile_main_info'>
                            <div className='pic_and_title'>
                                <div className='conver_pic'>
                                    <img src={cover} />
                                </div>
                                <div className='profile_pic'>
                                    <div className='pic_pic'>
                                        <img src={profile_image} />
                                    </div>
                                </div>
                                <div className='username_and_discription'>
                                    <div className='name_co_'>{firstName} {lastName}</div>
                                    <div className='username_con_'>@{username}</div>
                                    <div className='description_con_'>{bio}</div>
                                </div>
                                <div className='chicago_mine'>
                                    <div className='info_chicago'>
                                        <div>
                                            <img src={location_pic} width='14px' /> {location}
                                        </div>
                                        <div>
                                            <img src={join_pic} width='14px' /> Joined {chicago_date(db.join)}
                                        </div>
                                    </div>
                                    <div className='info_chicago_'>
                                        {db.link ? <><img src={link_pic} width='14px' /> <a href={link} target="_blank"> {link.slice(0, 200) + '...'} </a></> : <><img src={link_pic} width='14px' /> {link}</>}
                                    </div>
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
                </div>}
        </>
    }


    const container_search = () => {
        var isResult = true
        var users = ""
        var courses = ""

        if (!db) {
            // PRINT RESULT
            isResult = false
        }
        const dUsers = () => {
            db.forEach(element => {
                return <div> User </div>
            });
        }

        return <>
            <div className="search_container">
                {/* Input + Button Together */}
                <div className="search_box">
                    <input
                        type="text"
                        id="search_c"
                        value={search_container}
                        onChange={hcs}
                        placeholder='Seach for a course or for someone ..'
                        required
                    />
                    <button className="search_button" onClick={() => fetchDataForKey('search', cookie_log.cookie, cookie_log.email, api_url.api_inside, api_url.api_v)}>
                        <img src={searchIcon} />
                    </button>
                </div>
            </div>

            {isResult ? <div className='results'>
                <div className='sort'>
                    <div> Results Found </div>
                    <div> {db.length} </div>
                </div>
                {db.map((user, index) => (
                    <div key={index} className="user_item">
                        <div className='user_image'><img src={user.profile_image || profileIcon} width="18px" /></div>
                        <div className='user_info'><div className='user_info_name'>{user.firstName}{user.lastName}</div> <div className='user_info_username'>{user.username}</div><div className='user_info_bio'>{user.bio}</div></div>
                         {/* Adjust according to your data */}
                    </div>
                ))}
            </div> : <>
                <div className='sort'>

                </div>
                <div className='suggestions'>

                </div>
            </>}
        </>
    }

    const container_messages = () => {
        return ""
    }

    // RENDER MAIN HOME
    return (
        <>
            <Helmet>
                <title>University IO - Home</title>
                <meta name="description" content="Explore new skills or teach your own at University IO. Start learning or sharing your expertise in programming, IT, and entrepreneurship today." />
            </Helmet>

            {isLoading ? <>
                <Header login={true} ask={false} pic={user.picture} />

                <div className='home_page'>
                    <div className='home_header_pck'>
                        <div className='home_header'>
                            <div className='home_header_pack_one'>
                                <div onClick={() => fetchDataForKey('course', cookie_log.cookie, cookie_log.email, false)} className={`container_change ${io.course ? 'active' : ''}`}>
                                    <img src={courseIcon} alt="Course" width='18px' />
                                </div>
                                <div onClick={() => fetchDataForKey('profile', cookie_log.cookie, cookie_log.email, false)} className={`container_change ${io.profile ? 'active' : ''}`}>
                                    <img src={profileIcon} alt="Profile" width='18px' />
                                </div>
                                <div onClick={() => fetchDataForKey('search', cookie_log.cookie, cookie_log.email, false, "coos")} className={`container_change ${io.search ? 'active' : ''}`}>
                                    <img src={searchIcon} alt="Search" width='18px' />
                                </div>
                            </div>
                            <div className='home_header_pack_two'>
                                <div onClick={() => fetchDataForKey('messages', cookie_log.cookie, cookie_log.email, false)} className={`container_change ${io.messages ? 'active' : ''}`}>
                                    <img src={comments_regular} alt="messages" width='18px' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {cr ?
                        <div className='container'>
                            {io.course && <div className='course_container'>{container_course()}</div>}
                            {io.search && container_search()}
                            {io.lookup && lookup()}
                            {io.profile && <div className='profile_container'>{container_profile()}</div>}
                            {io.messages && <div className='messages_container'>{container_messages()}</div>}
                        </div> : <div className='cr'></div>}
                </div>
                <End login={true} ask={false} />
            </> : <Loading />}
        </>
    );
}

export default Home;

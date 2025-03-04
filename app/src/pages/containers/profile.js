import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bug from "./bug";
// Backgrounds For Profile
import bp_0 from '../../backgrounds_profile/0.jpg'
import bp_1 from '../../backgrounds_profile/1.jpg'
import bp_2 from '../../backgrounds_profile/2.jpg'
import bp_3 from '../../backgrounds_profile/3.jpg'
import bp_4 from '../../backgrounds_profile/4.jpg'
import bp_5 from '../../backgrounds_profile/5.jpg'
import bp_6 from '../../backgrounds_profile/6.jpg'
import bp_7 from '../../backgrounds_profile/7.jpg'
import bp_8 from '../../backgrounds_profile/8.jpg'
import bp_9 from '../../backgrounds_profile/9.jpg'

import pic_edit from '../../svg/pen-to-square-solid.svg'
import upload_solid from '../../svg/upload-solid.svg'
import link_pic from '../../svg/link-solid.svg'
import join_pic from '../../svg/calendar-days-solid.svg'
import location_pic from '../../svg/location-dot-solid.svg'
import verified from '../../svg/verified.svg';
// Array of cover images
const bps = [bp_0, bp_1, bp_2, bp_3, bp_4, bp_5, bp_6, bp_7, bp_8, bp_9];
// Randomly select a cover image from the bps array
const randomIndex = Math.floor(Math.random() * bps.length); // Generate a random index
const randombps = bps[randomIndex]

const Profile = ({ db, cookie_log, setDb, fetchDataForKey, API_BASE_URL, profileIcon}) => {
    const [chicago, setChicago] = useState('course');
    const [edit, setEdit] = useState(false)
    const [edit_info_message, setEdit_info_message] = useState(false)

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
                            <div className='name_co_'>{firstName} {lastName}{db.verified && <img className='verified' src={verified} width="22px" />}</div>
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
        return Bug('210')
    }
}

export default Profile
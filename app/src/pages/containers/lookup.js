import React, { useState, useEffect } from 'react';
import Bug from "./bug";
import link_pic from '../../svg/link-solid.svg'
import join_pic from '../../svg/calendar-days-solid.svg'
import location_pic from '../../svg/location-dot-solid.svg'

const Lookup = ({ db, cookie_log, setDb, fetchDataForKey, API_BASE_URL, profileIcon }) => {
    const [chicago, setChicago] = useState('course');
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
export default Lookup
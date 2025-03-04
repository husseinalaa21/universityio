import React, { useState, useEffect } from 'react';
import Bug from "./bug";
import link_pic from '../../svg/link-solid.svg'
import join_pic from '../../svg/calendar-days-solid.svg'
import location_pic from '../../svg/location-dot-solid.svg'
import profileIcon from '../../svg/user-solid.svg';
import verified from '../../svg/verified.svg';
import CourseStyle from './course_style.js'

const Lookup = ({ db, user, cookie_log, fetchDataForKey }) => {
    const [chicago, setChicago] = useState('courses');
    const change_chicago = (cc) => {
        setChicago(cc)
    }

    const chicago_con = () => {
        if (chicago == "degree") {
            return "This user didn't has degrees from university io"
        } else if (chicago == "courses") {
            return Object.values(db.courses_has)
                .filter(course => typeof course === "object" && course.name && course.description) // Ensures course is valid
                .length > 0 ? (
                Object.values(db.courses_has)
                    .filter(course => typeof course === "object" && course.name && course.description)
                    .map((course, index) => (
                        <CourseStyle
                            cover={course.cover}
                            profile_image={db.profile_image}
                            name={course.name}
                            user={db.firstName + db.lastName}
                            username={db.username}
                            link={course.link}
                            cookie_log={cookie_log}
                            price={course.price}
                            description={course.description}
                            fetchDataForKey={fetchDataForKey}
                        />
                    ))
            ) : (
                <p>No courses yet</p>
            )
        } else if (chicago == "activates") {
            return "No activates yet"
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
    const dashShow = (v, t) => {
        if (v == undefined || v.length == 0) {
            return t
        }
        return v
    }
    var firstName = db.firstName,
        lastName = db.lastName,
        username = db.username,
        bio = dashShow(db.bio, "No bio"),
        profile_image = db.profile_image || profileIcon,
        cover = db.cover,
        link = dashShow(db.link, "No Link"),
        location = dashShow(db.location, "No location");
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
                                <div className='name_co_'>{firstName} {lastName} {db.verified && <img className='verified' src={verified} width="22px" />}</div>
                                <div className='username_con_'>@{username}</div>
                                <div className='description_con_'>{bio}</div>
                            </div>
                            <div className='chicago_mine'>
                                <div className='info_chicago'>
                                    <div>
                                        <img src={location_pic} width='14px' /> {location}
                                    </div>
                                    <div>
                                        <img src={join_pic} width='14px' /> Joined {chicago_date(db.dateJoin)}
                                    </div>
                                </div>
                                <div className='info_chicago_'>
                                    {db.link ? <><img src={link_pic} width='14px' /> <a href={link} target="_blank"> {link.slice(0, 200) + '...'} </a></> : <><img src={link_pic} width='14px' /> {link}</>}
                                </div>
                            </div>
                        </div>
                        <div className='chicago_bar'>
                            <div onClick={() => change_chicago("courses")} className={chicago == "courses" && "chicago_bar_selected"}>
                                Courses
                            </div>
                            <div onClick={() => change_chicago("degrees")} className={chicago == "degrees" && "chicago_bar_selected"}>
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
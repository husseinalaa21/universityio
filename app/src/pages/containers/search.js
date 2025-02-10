import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bug from "./bug";
import searchIcon from '../../svg/seach-icon.svg';

const Search = ({ db, cookie_log, fetchDataForKey, profileIcon, setUrl_v, url_v}) => {
    var isResult = true
    var users = ""
    var courses = ""

    const hcs = (e) => {
        setUrl_v(e.target.value)
    }

    if (!db) {
        // PRINT RESULT
        isResult = false
    }

    return <>
        <div className="search_container">
            {/* Input + Button Together */}
            <div className="search_box">
                <input
                    type="text"
                    id="search_c"
                    value={url_v}
                    onChange={hcs}
                    placeholder='Seach for a course or for someone ..'
                    required
                />
                <button className="search_button" onClick={() => fetchDataForKey('search', cookie_log.cookie, cookie_log.email, "user", url_v)}>
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
                    <div className='user_info'><div className='user_info_name'>{user.firstName} {user.lastName}</div> <div className='user_info_username' onClick={() => fetchDataForKey('lookup', cookie_log.cookie, cookie_log.email, "lookup", user.username)}>@{user.username}</div><div className='user_info_bio'>{user.bio || "No bio yet"}</div></div>
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

export default Search
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bug from "./bug";
import searchIcon from '../../svg/seach-icon.svg';

const Search = ({ db, cookie_log, fetchDataForKey, API_BASE_URL, profileIcon, api_url, setApi_url}) => {
    const [search_container, setSearch_container] = useState("")
    var isResult = true
    var users = ""
    var courses = ""

    const hcs = (e) => {
        setSearch_container(e.target.value)
        setApi_url({ ...api_url, "api_v": e.target.value })
    }

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

export default Search
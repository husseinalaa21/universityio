import React, { useState, useEffect } from 'react';

const CourseStyle = ({ cover, profile_image, name, user, username, link, cookie_log, price, description, fetchDataForKey }) => {

    return <div className='hussein_' onClick={() => fetchDataForKey('course', cookie_log.cookie, cookie_log.email, "open", link)}>
        <div className='item-shape_' style={{ backgroundImage: `linear-gradient(to left, rgba(29, 88, 239, 0.28) 50%, rgba(4, 30, 65, 0.8) 100%), url(${cover})` }}>
            <div className='shape_flex_'>
                <div className='item-logo_'>
                    <img src={profile_image} alt={`${name} logo`} />
                </div>
                <div className='item_logo_title_'>
                    <h3>{name}</h3>
                    <h4>By {user}</h4>
                    <h4 onClick={() => fetchDataForKey('lookup', cookie_log.cookie, cookie_log.email, "lookup", username)}>@<mark>{username}</mark></h4>
                    <p className='price'>Price ${price}</p>
                </div>
            </div>
            <div className='description_'>
                {description}
            </div>
        </div>
    </div>

}

export default CourseStyle
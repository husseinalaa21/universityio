import React, { useState, useEffect } from "react";
import Bug from "./bug";
import plus from "../../svg/plus-solid.svg"
import note_img from '../../svg/quote-left-solid.svg';
import overall_icon from '../../svg/border-all-solid.svg';
import stars_icon from '../../svg/star-solid.svg';
import learn_icon from '../../svg/book-solid.svg';
import teach_icon from '../../svg/chalkboard-user-solid.svg';

const Course = ({ db, cookie_log, fetchDataForKey, profileIcon, setUrl_v, url_v, url_inside }) => {
    var hasValue = false
    // SETING UP NEW COURSE
    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [courseCategory, setCourseCategory] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation rules
        if (!courseName || !courseDescription || !coursePrice || !courseCategory) {
            setError('All fields are required');
            return;
        }

        if (courseName.length > 100) {
            setError('Course name must be no longer than 100 characters');
            return;
        }

        if (courseDescription.length > 500) {
            setError('Course description must be no longer than 500 characters');
            return;
        }

        const newCourse = {
            name: courseName,
            description: courseDescription,
            price: coursePrice,
            category: courseCategory,
            createdBy: cookie_log.userId // Assuming cookie_log contains the user's ID
        };

        fetchDataForKey("course", cookie_log.cookie, cookie_log.email, "new_course", JSON.stringify(newCourse))
    };

    if (url_inside == "learn" || url_inside == "teach" || url_inside == "new_course") {
        hasValue = true
    }
    const [type_show, setType_show] = useState({
        learn: hasValue ? url_inside == "learn" ? true : false : true,
        teach: hasValue ? url_inside == "teach" ? true : false : false,
        new_course: hasValue ? url_inside == "new_course" ? true : false : false
    })
    const type_show_ = (t) => {
        setType_show({
            learn: t === "learn",
            teach: t === "teach"
        });
        fetchDataForKey('course', cookie_log.cookie, cookie_log.email, t, "")
    };

    return <div className='course_container'>
        <div className="type_view">
            <div className={type_show.learn && "__selected"} onClick={() => type_show_("learn")}> <img src={learn_icon} width="15px" /> Courses </div>
            <div className={type_show.teach ? "__selected teach_ad" : "teach_ad"} onClick={() => type_show_("teach")}> <img src={teach_icon} width="17px" /> Teach <div className="new_t">Join <img src={stars_icon} width="8px" /></div></div>
        </div>
        <div className='ch_b'>
            {
                type_show.teach &&
                <div className="upload_course" onClick={() => setType_show({
                    learn: false,
                    teach: false,
                    new_course: true
                })}>
                    <div> Create new course </div>
                    <div className="upload_img"><img src={plus} width="16px" /></div>
                </div>
            }
            {type_show.new_course &&
                <div>
                    <h2>Create New Course</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Course Name:</label>
                            <input
                                type="text"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                maxLength={100} // Enforces a maximum length of 100 characters
                                required
                            />
                            <small>{courseName.length}/100 characters</small>
                        </div>
                        <div>
                            <label>Course Description:</label>
                            <textarea
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                maxLength={500} // Enforces a maximum length of 500 characters
                                required
                            />
                            <small>{courseDescription.length}/500 characters</small>
                        </div>
                        <div>
                            <label>Course Price:</label>
                            <input
                                type="number"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Course Category:</label>
                            <input
                                type="text"
                                value={courseCategory}
                                onChange={(e) => setCourseCategory(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Create Course</button>
                    </form>
                </div>}
            {type_show.learn &&
                <div className="courses_has">
                    <div className='ch_b_top_head'>
                        <div>{db.courses_has.hasOwnProperty()} course you have.</div>
                        <div>
                            sort A-Z
                        </div>
                    </div>
                    <div className='ch_a'>
                        <div className='ch_a_note'>
                            <img src={note_img} width='18px' />
                        </div>
                        <div className='ch_a_comment'>
                            Find your courses here—whether they're courses you've purchased or courses you've created.
                        </div>
                    </div>
                </div>}
        </div>
    </div>
}

export default Course;
import React, { useState, useEffect } from "react";
import Bug from "./bug";
import plus from "../../svg/plus-solid.svg"
import note_img from '../../svg/quote-left-solid.svg';
import overall_icon from '../../svg/border-all-solid.svg';
import stars_icon from '../../svg/star-solid.svg';
import learn_icon from '../../svg/book-solid.svg';
import teach_icon from '../../svg/chalkboard-user-solid.svg';
import back_icon from '../../svg/angle-left-solid.svg'

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
    var isNew_course = () => {
        if (url_inside == "new_course") {
            if (db.isSuccess == true) {
                return <div className="succ_new_course"> {db.message}</div>
            } else {
                return <div className="err_new_course"> {db.message}</div>
            }
        }
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
            <div className={type_show.teach || type_show.new_course ? "__selected teach_ad" : "teach_ad"} onClick={() => type_show_("teach")}> <img src={teach_icon} width="17px" /> Teach <div className="new_t">Join <img src={stars_icon} width="8px" /></div></div>
        </div>
        <div className='ch_b'>
            {
                type_show.teach &&
                <>
                    <div className="upload_cx">
                        <h3> Create New <mark>Course</mark> </h3>
                        <div className="upload_course" onClick={() => setType_show({
                            learn: false,
                            teach: false,
                            new_course: true
                        })}>
                            <div> Create new course </div>
                            <div className="upload_img"><img src={plus} width="16px" /></div>
                        </div>
                    </div>
                    <div className="course_has">
                        <h4> Browser courses that you have </h4>
                        <div className="courses_h">
                            {Object.values(db.courses_has)
                                .filter(course => typeof course === "object" && course.name && course.description) // Ensures course is valid
                                .length > 0 ? (
                                Object.values(db.courses_has)
                                    .filter(course => typeof course === "object" && course.name && course.description)
                                    .map((course, index) => (
                                        <div className='hussein_'>
                                            <div className='item-shape_' style={{ backgroundImage: `linear-gradient(to left, rgba(29, 88, 239, 0.28) 50%, rgba(4, 30, 65, 0.8) 100%), url(${course.cover})` }}>
                                                <div className='shape_flex_'>
                                                    <div className='item-logo_'>
                                                        <img src={profileIcon} alt={`${course.title} logo`} />
                                                    </div>
                                                    <div className='item_logo_title_'>
                                                        <h3>{course.name}</h3>
                                                        <h4>By <mark>You</mark></h4>
                                                        <p>{course.description}</p>
                                                        <p>Price ${course.price}</p>
                                                    </div>
                                                </div>
                                                <div className='tags'>

                                                </div>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p>No courses yet</p>
                            )}
                        </div>
                    </div>
                </>
            }
            {type_show.new_course &&
                <div className="create_course_form_">
                    <div className="back" onClick={() => type_show_("teach")}> <img src={back_icon} width="14px" /> </div>
                    {isNew_course()}
                    <div className="create_course_form">
                        <h2>Create New <mark>Course</mark></h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Course Name</label>
                                <input
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    maxLength={100} // Enforces a maximum length of 100 characters
                                    required
                                />
                                <div className="length">
                                    <small>{courseName.length}/100 characters</small>
                                </div>
                            </div>
                            <div>
                                <label>Course Description</label>
                                <textarea
                                    value={courseDescription}
                                    onChange={(e) => setCourseDescription(e.target.value)}
                                    maxLength={500} // Enforces a maximum length of 500 characters
                                    required
                                />
                                <div className="length">
                                    <small>{courseDescription.length}/500 characters</small>
                                </div>
                            </div>
                            <div>
                                <label>Course Price</label>
                                <input
                                    type="number"
                                    value={coursePrice}
                                    onChange={(e) => setCoursePrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="calculate_price">
                                <h3>Receipt (Per Sale)</h3>
                                <p>Original Price: ${parseFloat(coursePrice || 0).toFixed(2)}</p>
                                <p>Sales Fee (20%): -${(coursePrice * 0.2).toFixed(2)}</p>
                                <hr />
                                <p><strong>Final Earnings Per Sale: ${parseFloat(coursePrice * 0.8 || 0).toFixed(2)}</strong></p>
                            </div>
                            <div>
                                <label>Course Category</label>
                                <input
                                    type="text"
                                    value={courseCategory}
                                    onChange={(e) => setCourseCategory(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="butt_create">Create Course</button>
                        </form>
                    </div>
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
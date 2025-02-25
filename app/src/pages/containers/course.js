import React, { useState, useEffect } from "react";
import Bug from "./bug";
import plus from "../../svg/plus-solid.svg"
import note_img from '../../svg/quote-left-solid.svg';
import overall_icon from '../../svg/border-all-solid.svg';
import stars_icon from '../../svg/star-solid.svg';
import learn_icon from '../../svg/book-solid.svg';
import teach_icon from '../../svg/chalkboard-user-solid.svg';

const Course = (props) => {
    const [type_show, setType_show] = useState({
        learn: false,
        teach: false,
        overall: true
    })
    const type_show_ = (t) => {
        setType_show({
            learn: t === "learn",
            teach: t === "teach",
            overall: t === "overall"
        });
    };
    var db = props.db

    return <div className='course_container'>
        <div className="type_view">
            <div className={type_show.overall && "__selected"} onClick={() => type_show_("overall")}> <img src={overall_icon} width="14px" /> Public </div>
            <div className={type_show.learn && "__selected"} onClick={() => type_show_("learn")}> <img src={learn_icon} width="12px" /> Learn </div>
            <div className={type_show.teach ? "__selected teach_ad" : "teach_ad"} onClick={() => type_show_("teach")}> <img src={teach_icon} width="17px" /> Teach <div className="new_t">Join <img src={stars_icon} width="8px" /></div></div>
        </div>
        <div className='ch_b'>
            {type_show.teach ?
                <div className="upload_course">
                    <div>Create new course</div>
                    <div className="upload_img"><img src={plus} width="16px" /></div>
                </div> : <></>}
            {type_show.learn ?
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
                </div> : <></>}
            {type_show.overall ?
                <div className="overall">
                </div> : <></>}
        </div>
    </div>
}

export default Course;
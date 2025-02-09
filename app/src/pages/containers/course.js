import React from "react";
import Bug from "./bug";
import note_img from '../../svg/quote-left-solid.svg';

const Course = (props) => {
    var db = props.db
    try {
        return <div className='course_container'>
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
                        {Bug('110')}
                    </div>
                </div>
            </div>
        </div>
    } catch {
        return Bug('110')
    }
}

export default Course;
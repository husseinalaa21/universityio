import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import End from './end';

const Support = (props) => {

  return (
    <>
        <Header login={false} ask={!false} />
        <div className='about_page'>
            <div className='title'>
                Support
            </div>
            <div className='continer'>
                <div className='continer_title'>

                </div>
                <div className='continer_con'>
                    <div ></div>
                </div>
            </div>
        </div>
        <End login={false} ask={!false} />
    </>
  );
};
export default Support;
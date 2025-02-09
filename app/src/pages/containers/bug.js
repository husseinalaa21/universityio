import React from "react"
import pic_bug from '../../svg/bug-solid.svg'

const Bug = (er) => {
    return <div className='error_container'> <img src={pic_bug} width='18px' /> Error Code: {er}. Our development team has been notified and is working to resolve this issue as soon as possible. Thank you for your patience! </div>
}


export default Bug;
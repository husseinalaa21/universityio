import react from 'react'
import '../style/main.css';
import logo from '../logos/logo.png';

function Loading() {
    return (
        <div className='loading_main'>
            <div className='loading_logo'>
                <img className="_logo" src={logo} alt="logo" />
            </div>
        </div>
    )
}

export default Loading;
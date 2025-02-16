import react from 'react'
import '../style/main.css';
import logo from '../logos/logo.png';

function Loading() {
    return (
        <div className='loading_main'>
            <div>
            <div className='loading_logo'>
                <img className="_logo" src={logo} alt="logo" />
            </div>

            <div class="scene">
                <div class="cube-wrapper">
                    <div class="cube">
                        <div class="cube-faces">
                            <div class="cube-face shadow"></div>
                            <div class="cube-face bottom"></div>
                            <div class="cube-face top"></div>
                            <div class="cube-face left"></div>
                            <div class="cube-face right"></div>
                            <div class="cube-face back"></div>
                            <div class="cube-face front"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Loading;
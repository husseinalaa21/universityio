import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './header';
import End from './end';
import Home from './home';
import Intro from './introducing';
// CHECK LOGIN STETUS //
function App() {
    // Retrieve cookies using js-cookie
    const cookie = Cookies.get('cookie');
    const email = Cookies.get('email');

    const [isLogin, setisLogin] = useState((false))

    return (
        <>
            <Header login={false} ask={true} />
            {isLogin ? <Home /> : <Intro />}
            <End />
        </>
    );
}

export default App;
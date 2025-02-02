import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Cookies from 'js-cookie';
import axios from 'axios'; // Ensure axios is installed via npm
import Home from './home';
import Intro from './introducing';
import axios from 'axios'; // Ensure axios is installed via npm

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const cookie = Cookies.get('cookie');
        const email = Cookies.get('email');

        if (cookie && email && !isLogin) {
            const API_BASE_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : 'https://server.universityio.com';

            axios.post(`${API_BASE_URL}/home`, { email, cookie })
                .then(response => {
                    if (response.status === 200) {
                        setIsLogin(true);
                        setUserData(response.data); // Set the user data from response
                    } else {
                        setIsLogin(false);
                        // Optionally clear cookies if the status code indicates a failed login
                        Cookies.remove('cookie');
                        Cookies.remove('email');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data: ', error);
                    setIsLogin(false);
                    // Optionally clear cookies if the status code indicates a failed login
                    Cookies.remove('cookie');
                    Cookies.remove('email');
                });
        }
    }, [isLogin]); // Dependencies array ensures this runs only when isLogin changes

    return (
        <>
            <Helmet>
                <title>University IO - buy or sell online courses</title>
                <meta name="description" content="Explore new skills or teach your own at University IO. Start learning or sharing your expertise in programming, IT, and entrepreneurship today." />
            </Helmet>
        </>
    );
}

export default App;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import '../style/main.css';
import End from './end'
import Header from './header'
import cc from '../pages/cc'
import { Helmet } from 'react-helmet';

const User = () => {
    const API_BASE_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://server.universityio.com';
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [found, setFound] = useState(false)

    const [searchParams] = useSearchParams();
    const extra = searchParams.get('n');

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(true)
            cc().then(e => {
                if (e.s == true) {
                    navigate('/home?type=lookup&user=' + extra, { replace: true });
                } else {
                    axios.post(`${API_BASE_URL}/home/search`, { username: extra }) // Ensure proper credentials
                        .then(response => {

                            if (response.status === 200) {
                                const parsedData = response.data

                                // Extract cookie and email
                                const { cookie, email } = parsedData;
                                setFound(true)
                            } else {
                                setFound(false)
                            }
                        })
                }
            }).catch(error => {
                navigate('/', { replace: true });
            })
        }
    }, [isLoading]);
    return (
        <>
            <Helmet>
                <title>University IO - {extra}</title>
                <meta name="description" content="" />
            </Helmet>
            <Header login={false} ask={true} />
            {found ? <div className='user_not_found'> Sorry, but we weren't able to locate this user! </div> : <>

            </>}
            <End login={true} ask={false} />
        </>
    );
};

export default User;
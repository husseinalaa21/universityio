import React from "react";
import Cookies from 'js-cookie';
import axios from 'axios'; // Ensure axios is installed via npm

// Define the `cc` function
function cc() {
    return new Promise((resolve) => {
        const cookie = Cookies.get('cookie');
        const email = Cookies.get('email');

        if (cookie && email) {
            const API_BASE_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:5000'
                : 'https://server.universityio.com';

            axios.post(`${API_BASE_URL}/home`, { email, cookie })
                .then(response => {
                    if (response.status === 200) {
                        resolve({ s: true, c: cookie, m: email }); // Success
                    } else {
                        // Clear cookies if the status code indicates a failed login
                        Cookies.remove('cookie');
                        Cookies.remove('email');
                        resolve({ s: false }); // Failure
                    }
                })
                .catch(error => {
                    // Clear cookies if there's an error
                    Cookies.remove('cookie');
                    Cookies.remove('email');
                    resolve({ s: false }); // Failure
                });
        } else {
            resolve({ s: false }); // Failure
        }
    });
}

// Export the `cc` function
export default cc;

import React from "react";
import Cookies from 'js-cookie';
import axios from 'axios'; // Ensure axios is installed via npm

// Define the `cc` function
function cc() {
    return new Promise((resolve) => {
        const API_BASE_URL = window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : 'https://server.universityio.com';

        axios.post(`${API_BASE_URL}/home`, {}, { withCredentials: true }) // Ensure proper credentials
            .then(response => {

                if (response.status === 200) {
                    const parsedData = response.data

                    // Extract cookie and email
                    const { cookie, email } = parsedData;

                    // Resolve with extracted values
                    resolve({ s: true, c: cookie, m: email }); // Success
                } else {
                    resolve({ s: false, status: 0 }); // Failure
                }
            })
            .catch(error => {
                console.error('Error fetching cookie:', error);
                resolve({ s: false }); // Failure
            });
    });
}



// Export the `cc` function
export default cc;

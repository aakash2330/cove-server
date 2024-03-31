import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

//Updating the state values here for the login info
const Logout = ({ setIsLoggedIn, setUsername}) => {

    //navigate directories
    const navigate = useNavigate();

    // Handling the submission
    const handleClick= async (e) => {
        e.preventDefault();
    try{
        setIsLoggedIn(false);
        setUsername();

        localStorage.removeItem('token');
        localStorage.removeItem('username');

            if (!token) {
                //After logout redirect to the home page
                navigate('/');
            } else {
                //Handle failed login
                const errorData = await response.json();
                console.error('Failed Logout', errorData.message);
            }
        } catch (error) {
            console.error('Error during logout: ', error.message);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">

                <p className="mt-4 text-gray-500" onClick={handleClick}>
                    Logout
                </p>
            </div>

        </div>
    );
}

export default Logout;
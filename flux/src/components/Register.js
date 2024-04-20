import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import '../index.css';

//Updating the state values here for the register
const Register = ({ setIsLoggedIn, setUsername, setAutoLogout }) => {

    //State to manage the input fields in the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUsername, setCreateUsername] = useState('');
    const navigate = useNavigate();

    // Handling the submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //API request to handle register
        try {
            const response = await fetch('http://localhost:3001/auth/verify/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: createUsername,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { token, username, logoutOnExpire } = responseData;
                console.log('Response Data: ', responseData);
                setIsLoggedIn(true);
                setAutoLogout(logoutOnExpire);
                console.log('Lets see the value of Username: ', username);
                //Save token to local storage for when the user makes a future request
                Cookies.set('token', token, { expires: 1, secure: true });
                //Saving the username as well so it is displayed and the state doesn't lose it on reload
                localStorage.setItem('username', username);
                setUsername(username);
                //After login redirect to the home page
                navigate('/');
            } else {
                //Handle failed login
                const errorData = await response.json();
                console.error('Failed Login', errorData.message);
            }
        } catch (error) {
            console.error('Error during login: ', error.message);
        }
    };

    // Update state on input change
    const handleInputChange = (e) => {
        if (e.target.name === 'createUsername') {
            setCreateUsername(e.target.value);
            console.log("Creating username now: ", createUsername);
        } else if (e.target.name === 'email') {
            setEmail(e.target.value);
            console.log("Checking the email now: ", email);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
            console.log("Checking the password now: ", password);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center flex flex-col items-center">
                <h1 className="text-2xl font-bold sm:text-3xl">First time shopping?</h1>

                <p className="mt-4">
                    <HiOutlineShoppingBag size={40} />
                </p>
            </div>

            <form onSubmit={handleSubmit} method="POST" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="createUsername" className="sr-only">Username</label>

                    <div className="relative">
                        <input
                            type="text"
                            id="createUsername"
                            name="createUsername"
                            value={createUsername}
                            onChange={handleInputChange}
                            className="w-full border-[#e0e0e0] text-[#6B7280] p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter username"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full border-[#e0e0e0] text-[#6B7280] p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter email"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        Already have an account?
                        <a className="underline" href="/auth/login">Sign in</a>
                    </p>

                    <button
                        type="submit"
                        className="inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2"
                    >
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;
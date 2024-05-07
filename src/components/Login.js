import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import '../index.css';
//Updating the state values here for the login info
const Login = ({ setIsLoggedIn, setUsername, refetchCartData, url }) => {

    //State to manage the input fields in the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrMessage] = useState('');
    const navigate = useNavigate();

    // Handling the submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //API request to handle login
        try {
            const response = await fetch(`${url}/auth/verify/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                const { token, username } = responseData;
                // console.log('Response Data: ', responseData);
                setIsLoggedIn(true);
                setUsername(username); //setting the state of username to the associated username to use in Navbar
                // console.log('Lets see the value of Username: ', username);
                //Saving token to cookies to avoid XSS attacks
                Cookies.set('token', token, { expires: 7, secure: true });
                //Saving the username as well so it is displayed and the state doesn't lose it on reload
                localStorage.setItem('username', username);
                refetchCartData();
                //After login redirect to the home page
                navigate('/');
            } else {
                //Handle failed login
                const errorData = await response.json();
                console.error(errorData.message);
                setErrMessage(errorData.message);
            }
        } catch (error) {
            console.error('Error during login: ', error.message);
        }
    };

    // Update state on input change
    const handleInputChange = (e) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            // console.log('Checking the email now: ', email);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
            // console.log('Checking the password now: ', password);
        }
    };

    return (
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-lg text-center flex flex-col items-center'>
                <h1 className='text-2xl font-bold sm:text-3xl'>Shop with us today!</h1>

                <p className='mt-4'>
                    <HiOutlineShoppingBag size={40} />
                </p>
            </div>


            <form onSubmit={handleSubmit} method='POST' className='mx-auto mb-0 mt-8 max-w-md space-y-4'>
                <div>
                    <label htmlFor='email' className='sr-only'>Email</label>

                    <div className='relative'>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleInputChange}
                            className='w-full border-[#e0e0e0] text-[#6B7280] p-4 pe-12 text-sm shadow-sm'
                            placeholder='Enter email'
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor='password' className='sr-only'>Password</label>

                    <div className='relative'>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            className='w-full border-[#e0e0e0] text-[#6B7280] p-4 pe-12 text-sm shadow-sm'
                            placeholder='Enter password'
                        />
                    </div>
                    <p className='text-red-600 text-sm p-4 pe-12'>{errMessage}</p>
                </div>

                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        No account?
                        <a className='underline' href='/auth/register'>Sign up</a>
                    </p>

                    <a href='/auth/login'>
                        <button
                            type='submit'
                            className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2'
                        >
                            Sign in
                        </button>
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Login;
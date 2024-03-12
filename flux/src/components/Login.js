import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

//Updating the state values here for the login info
const Login = ({ setIsLoggedIn, setUsername}) => {

    //State to manage the input fields in the form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handling the submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        //API request to handle login
        try {
            const response = await fetch('http://localhost:3001/auth/login', {
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
                console.log('Response Data: ', responseData);
                setIsLoggedIn(true); 
                //setting the state of username to the associated username to use in Navbar
                setUsername(username);
                console.log('Lets see the value of Username: ', username);
                //Save token to local storage for when the user makes a future request
                localStorage.setItem('token', token);
                //Saving the username as well so it is displayed and the state doesn't lose it on reload
                localStorage.setItem('username', username);

                //After login redirect to the home page
                navigate('/home');
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
        if (e.target.name === 'email') {
            setEmail(e.target.value);
            console.log("Checking the email now: ", email);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
            console.log("Checking the password now: ", password);
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Shop with us today!</h1>

                <p className="mt-4 text-gray-500">
                    Put a Shopping bag here.
                </p>
            </div>

            <form onSubmit={handleSubmit} method="POST" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
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
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter password"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        No account?
                        <a className="underline" href="/auth/register">Sign up</a>
                    </p>

                    <button
                        type="submit"
                        className="inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
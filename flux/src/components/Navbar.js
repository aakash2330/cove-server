import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
//Importing react dom to use portals

//Taking the actual state values to use here
const Navbar = ({ isLoggedIn, username, onLogout }) => {

    return (
        <nav className='flex border-solid border-2 border-yellow-400 justify-between px-10 text-base font-thin tracking-wide py-5'>
            <div className="flex flex-row border-solid border-2 border-red-400 flex-grow w-1 items-center justify-start space-x-4 text-sm">
                <Link to={`/`}>
                    <p className='border-transparent border-b hover:border-black py-1'>Home</p>
                </Link>
                <Link to={`/shop`}>
                    <p className='border-transparent border-b hover:border-black py-1'>Shop</p>
                </Link>
                <Link to={`/collection`}>
                <p className='border-transparent border-b hover:border-black py-1 '>Collection</p>
                </Link>
                <Link to={`/contact`}>
                <p className='border-transparent border-b hover:border-black py-1'>Contact</p>
                </Link>
            </div>
            <div className='flex-row justify-between border-solid border-2 border-blue-400 flex-grow w-1 text-center items-center text-2xl font-medium tracking-widest'>
                <p className='border-b-2 border-transparent'>FluxCove</p>
            </div>
            <div className='flex flex-row border-solid border-2 border-green-400 flex-grow w-1 items-center justify-end space-x-4 text-sm'>
                <p className=''>Icon 1</p>
                {/* If log in is true then show the following else show sign up */}
                {isLoggedIn ? (
                    <>
                        <p className='username'>Hi {username}</p>
                        <div className='modal border-solid border-2 border-blue-400'>
                            <p className='text-gray-900 border-solid border-2 border-blue-400' onClick={onLogout}>Sign Out</p>
                        </div>
                    </>
                ) : (
                    <Link to={`/auth/login`}>
                        <p className=''>Sign In</p>
                    </Link>
                )}
                <Link to ={`/cart`}>
                <span className='material-symbols-outlined'>
                    shopping_cart
                </span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
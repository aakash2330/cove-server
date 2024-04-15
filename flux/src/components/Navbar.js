import React from 'react';
import { AiOutlineInstagram } from "react-icons/ai";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import '../index.css';

//Taking the actual state values to use here
const Navbar = ({ isLoggedIn, username, onLogout, cartAmount }) => {

    return (
        <nav className='flex justify-between md:px-10 text-base font-thin tracking-wide py-5'>
            <div className="flex flex-row grow w-1 items-center justify-start space-x-4 text-xs md:text-sm">
                <Link to={`/`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Home</p>
                </Link>
                <Link to={`/shop`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Shop</p>
                </Link>
                <Link to={`/collection`}>
                <p className='border-transparent border-b hover:border-black py-1 font-light '>Collection</p>
                </Link>
                <Link to={`/contact`}>
                <p className='border-transparent border-b hover:border-black py-1 font-light'>Contact</p>
                </Link>
            </div>
            <div className='flex-row justify-between grow w-1 text-center items-center md:text-2xl text-lg font-medium tracking-widest'>
                <p className='border-b-2 border-transparent'>FluxCove</p>
            </div>
            <div className='flex flex-row grow w-1 items-center justify-end space-x-4 text-sm'>
            <AiOutlineInstagram size={20} />
                {/* If log in is true then show the following else show sign up */}
                {isLoggedIn ? (
                    <>
                        <p className='username font-semibold text-xs md:text-sm'>Hi, {username}</p>
                        <div className='modal'>
                            <p className='border-transparent border-b hover:border-black py-1 font-light' onClick={onLogout}>Sign Out</p>
                        </div>
                    </>
                ) : (
                    <Link to={`/auth/login`}>
                        <p className='border-transparent border-b hover:border-black py-1 font-light text-xs md:text-sm'>Sign In</p>
                    </Link>
                )}
                <Link to ={`/cart`}>
                <div className='flex flex-row text-xs md:text-sm'>
                <PiShoppingCartSimpleFill size={20} />
                {/* <p className='text-sm'></p> */}
                <p className='text-xs md:text-sm font-light'>{cartAmount}</p>
                </div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
import { React, useState } from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import '../index.css';

//Taking the actual state values to use here
const Navbar = ({ isLoggedIn, username, onLogout, cartAmount }) => {

    const [toggleMenu, setToggleMenu] = useState(false);

    const menuSelect = () => {
        setToggleMenu(!toggleMenu);
    }

    return (
        <nav className='flex justify-between md:px-10 text-base font-thin tracking-wide py-5'>
            {/* Hamburger Menu */}
            <div className='lg:hidden grow md:justify-center'>
                {!toggleMenu ?
                    (
                        <div className='lg:hidden md:flex md:grow'>
                            <button onClick={menuSelect} className='md:flex md:items-center py-2'>
                                <RxHamburgerMenu size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className='lg:hidden z-50 bg-white text-black text-2xl md:text-4xl top-0 left-0 w-full h-full md:h-1/2 
                        flex flex-col items-start p-4 absolute  border-b border-solid border-white rounded-lg shadow-lg'>
                            <button onClick={menuSelect}>
                                <IoClose />
                            </button>
                            <div className='flex flex-col grow w-full justify-center text-center'>
                                <ul>
                                    <Link to={`/`}>
                                        <li className='font-light list-none pb-4' onClick={menuSelect}>Home</li>
                                    </Link>
                                    <Link to={`/shop`}>
                                        <li className='font-light list-none pb-4' onClick={menuSelect}>Shop</li>
                                    </Link>
                                    <Link to={`/collection`}>
                                        <li className='font-light list-none pb-4' onClick={menuSelect}>Collection</li>
                                    </Link>
                                    <Link to={`/contact`}>
                                        <li className='font-light list-none pb-4' onClick={menuSelect}>Contact</li>
                                    </Link>
                                    <li className='font-light list-none' onClick={() => {
                                        onLogout();
                                        menuSelect();
                                    }
                                    }>Sign Out</li>
                                </ul>
                            </div>
                        </div>
                    )

                }
            </div>
            {/* navbar on larger screens */}
            <div className='hidden lg:flex lg:flex-row lg:grow lg:w-1 lg:items-center lg:justify-start lg:space-x-4 lg:text-sm'>
                <Link to={`/`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Home</p>
                </Link>
                <Link to={`/shop`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Shop</p>
                </Link>
                <Link to={`/collection`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Collection</p>
                </Link>
                <Link to={`/contact`}>
                    <p className='border-transparent border-b hover:border-black py-1 font-light'>Contact</p>
                </Link>
            </div>
            {/* Flux Logo Text */}
            <div className='grow w-1 md:self-center text-center items-center py-1 lg:text-2xl text-lg font-medium tracking-widest'>
                <p>FluxCove</p>
            </div>
            {/* Instagram icon */}
            <div className='flex flex-row grow-2 md:grow md:w-1 items-center justify-end space-x-2 md:space-x-4 text-sm'>
                <AiOutlineInstagram size={20} />
                {/* If log in is true then show the following else show sign up */}
                {isLoggedIn ? (
                    <>
                        <p className='font-semibold text-xs md:text-sm'>Hi, {username}</p>
                        <div className='modal'>
                            <p className='border-transparent border-b hover:border-black py-1 text-xs md:text-sm font-light' onClick={onLogout}>Sign Out</p>
                        </div>
                    </>
                ) : (
                    <Link to={`/auth/login`}>
                        <p className='border-transparent border-b hover:border-black py-1 font-light text-xs md:text-sm'>Sign In</p>
                    </Link>
                )}
                <Link to={`/cart`}>
                    <div className='flex flex-row text-xs md:text-sm mr-6 md:mr-0'>
                        <PiShoppingCartSimpleFill size={20} />
                        <p className='text-xs md:text-sm font-light'>{cartAmount}</p>
                    </div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
//Importing react dom to use portals
import ReactDOM from 'react-dom';

//Taking the actual state values to use here
const Navbar = ({ isLoggedIn, username, onLogout }) => {
    const [showModal, setShowModal] = useState(false);

   
    function Modal() {
        //Where I want to put it on the dom
        const modalContainer = document.querySelector('#modal');
        console.log(modalContainer);

        // Check if the modal container is found
        if (!modalContainer) {
            console.error('Modal container not found in the DOM');
            return null; // Return null if the container is not found
        }

        return ReactDOM.createPortal(
            //The element I want to place
            <p className='text-gray-900 border-solid border-2 border-blue-400' onClick={onLogout}>Sign Out</p>,
            modalContainer
        );
    };

    return (
        <nav className='flex border-solid border-2 border-yellow-400 justify-between px-10 text-base font-thin tracking-wide py-10'>
            <div className="flex flex-row border-solid border-2 border-red-400 flex-grow w-1 items-center justify-start space-x-4">
                <Link to={`/home`}>
                    <p className='border-transparent border-b hover:border-black py-1'>Shop</p>
                </Link>
                <p className='border-transparent border-b hover:border-black py-1 '>Collection</p>
                <p className='border-transparent border-b hover:border-black py-1'>Contact</p>
            </div>
            <div className='flex-row justify-between border-solid border-2 border-blue-400 flex-grow w-1 text-center items-center text-2xl font-medium tracking-widest'>
                <p className='border-b-2 border-transparent'>FluxCove</p>
            </div>
            <div className='flex flex-row border-solid border-2 border-green-400 flex-grow w-1 items-center justify-end space-x-4'>
                <p className=''>Icon 1</p>
                {isLoggedIn ? (
                    <>
                        <p className='username' onClick={() => { console.log('Clicked!'); setShowModal(!showModal); }}>Hi {username}</p>
                        {/* If the modal is set to true then show modal and on close set the modal to false */}
                        {showModal && <Modal />}
                    </>
                ) : (
                    <Link to={`/auth/login`}>
                        <p className=''>Sign In</p>
                    </Link>
                )}
                <span className='material-symbols-outlined'>
                    shopping_cart
                </span>
            </div>
        </nav>
    );
}

export default Navbar;
import { Link } from 'react-router-dom';
import '../index.css';

//Taking the actual state values to use here
const Navbar = ({isLoggedIn, username}) => {

    return(
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
            <p className=''>{username}</p> ) : (
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
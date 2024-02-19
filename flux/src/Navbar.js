import './index.css';

function Navbar() {

    return(
        <nav className='flex border-solid border-2 border-yellow-400 justify-between px-10 text-base font-thin tracking-wide py-2'>
            <div className="flex flex-row border-solid border-2 border-red-400 flex-grow w-1 items-center justify-start space-x-4">
            {/* Trying out underline insteas of border and make sure to add line spacing after */}
            <p className='hover:underline'>Shop</p>
            <p className='border-b-2 border-transparent hover:border-black'>Shop</p>
            <p className='border-b-2 border-transparent hover:border-black'>Contact</p>
            </div>
            <div className='flex-row justify-between border-solid border-2 border-blue-400 flex-grow w-1 text-center items-center text-2xl font-medium tracking-widest'>
            <p className='border-b-2 border-transparent'>FluxCove</p>
            </div>
            <div className='flex flex-row border-solid border-2 border-green-400 flex-grow w-1 items-center justify-end space-x-4'>
            <p className='border-b-2 border-transparent hover:border-black'>Icon 1</p>
            <p className='border-b-2 border-transparent hover:border-black'>Sign In</p>
            <p className='border-b-2 border-transparent hover:border-black'>Cart</p>
            </div>
        </nav>
    );
}

export default Navbar;
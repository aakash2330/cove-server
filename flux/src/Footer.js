import './index.css';

function Footer() {
    return(
        <div className='flex flex-col border-solid border-2 border-pink-400 my-16'>
            <div className='flex flex-row justify-center mx-96 mt-16 border-solid border-2 border-yellow-400'>
                <p className='mx-2'>icon1</p>
                <p className='mx-2'>icon2</p>
            </div>
            <div className=' flex flex-col mx-96 border-solid border-2 border-red-400 mt-16'>
            <div className='text-center border-solid border-2 border-blue-400 mb-2.5 '>
                <p>Sign up to receive news and updates</p>
            </div>
            <div className='flex-row text-center'>
                <input type='email' name='email' id='email' autoComplete='email' placeholder='Email' className='border-slate-400'></input>
                <button type='button' className='bg-black text-white'>Sign Up</button>
            </div>
            </div>
        </div>
    );
}

export default Footer;
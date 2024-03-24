import homeBanner from '../images/home-banner.png';
import '../index.css';

function Footer() {
    return(
        <>
        <div>
        <img
                src={homeBanner}
                alt='hero banner'
                className='object-cover w-full h-96 border-solid border-2 border-red-400'
            />
        </div>
        <div class='flex flex-col bg-black text-white'>
    <div class='flex flex-row border-solid border-2 border-pink-400 mt-16'>
        {/* About and Contact */}
        <div class='flex flex-col ml-36 mt-16 h-[206px] w-[94px] border-solid border-2 border-yellow-400 underline underline-offset-8'>
            <p class='mx-2'>About</p>
            <p class='mx-2'>Contact</p>
            <p class='mx-2'>Privacy Policy</p>
        </div>

        {/* Social Media Links */}
        <div class='flex flex-col ml-20 mt-16 h-[206px] w-[94px] border-solid border-2 border-yellow-400 underline underline-offset-8'>
            <p class='mx-2'>Twitter</p>
            <p class='mx-2'>Instagram</p>
            <p class='mx-2'>Youtube</p>
        </div>

        {/* Sign Up Section */}
        <div class='flex flex-col mx-96 border-solid border-2 border-red-400 mt-16'>
            <div class='text-center border-solid border-2 border-blue-400 mb-2.5 '>
                <p>Sign up to receive news and updates</p>
            </div>
            <div class='flex flex-row justify-center items-center mb-4'>
                <input type='email' name='email' id='email' autoComplete='email' placeholder='Email' class='border-slate-400'></input>
                <button type='button' class='bg-slate-600 text-white ml-2'>Sign Up</button>
            </div>
        </div>
    </div>

    {/* Border Bottom and FluxCove */}
    <div class='flex flex-col'>
        <div class='border-b border-slate-200 py-4 mb-4'></div>
        <p>FluxCove / Made by Ryan Ebanks</p>
    </div>
</div>

        </>
    );
}

export default Footer;
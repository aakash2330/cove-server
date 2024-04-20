import '../index.css';

function Footer() {
    return (
        <div className='bottom-0'>
            <div className='flex flex-col bg-black text-white w-full'>
                <div className='flex flex-row items-end pt-2 px-4'>
                    <p className='grow font-sm text-left'>Follow Us</p>
                    <p className='grow text-2xl font-bold text-center'>FluxCove</p>
                    <p className='grow font-sm text-right'>On Our Socials</p>
                </div>
                <div className='flex flex-col md:flex-row mt-4 lg:mt-14 px-4 lg:px-8'>
                    {/* About and Contact */}
                    <div className='flex grow flex-col lg:w-1/4 lg:mr-12 underline underline-offset-8'>
                        <p className='pb-2'>About</p>
                        <p className='pb-2'>Contact</p>
                        <p>Privacy Policy</p>
                    </div>

                    {/* Social Media Links */}
                    <div className='flex grow flex-col my-4 md:my-0 lg:w-1/4 lg:mr-12 underline underline-offset-8'>
                        <a href='https://twitter.com/?lang=en' className='pb-2'>Twitter</a>
                        <a href='https://www.instagram.com/' className='pb-2'>Instagram</a>
                        <a href='https://www.youtube.com/' className='pb-2'>Youtube</a>
                    </div>

                    {/* Sign Up Section */}
                    <div className='flex flex-col lg:w-1/2 justify-center'>
                        <div className='text-center mb-2.5 '>
                            <p className='md:text-lg'>Sign up to receive news and updates</p>
                        </div>
                        <div className='flex flex-col lg:flex-row justify-center items-center mb-4'>
                            <input type='email' name='email' id='email' placeholder='Email' className='border-slate-400 py-3.5 px-6 text-black' />
                            <button type='button' className='inline-block font-medium bg-slate-800 text-white hover:bg-slate-600 py-3.5 px-6 ml-2'>Sign Up</button>
                        </div>
                    </div>
                </div>

                {/* Border Bottom and FluxCove */}
                <div className='flex flex-col px-4'>
                    <div className='border-b border-slate-200 py-4 mb-4'></div>
                    <p className='pb-1'>FluxCove / Made by Ryan Ebanks</p>
                </div>
            </div>

        </div>
    );
}

export default Footer;
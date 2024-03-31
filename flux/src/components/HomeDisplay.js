import heels from '../images/heels.jpg';
import homeDisplay from '../images/home-display.jpg';
import sandals from '../images/sandals.jpg';
import shoeDisplay from '../images/shoe-display.jpg';
import sneakers from '../images/sneakers.jpg';
import '../index.css';


function HomeDisplay() {
    return (
        // section 1
        <div>
            <div className='flex flex-row justify-center pt-14'>
            <div className='flex-col m-8 w-[611px] h-[746.922x]'>
                <img
                    src={sneakers}
                    alt='guy in sneakers'
                    className='object-cover w-[692.984px] h-[518px] pr-8'
                />
                <a href='/api/product/category/sneakers'>
                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Sneakers</button>
                </a>
            </div>
            <div className='flex-col m-8 w-[611px] h-[746.922x]'>
                <img
                    src={heels}
                    alt='girl in heels'
                    className='object-cover w-[692.984px] h-[518px] pr-8'
                />
                <a href='/api/product/category/heels'>
                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Heels</button>
                </a>
            </div>
            <div className='flex-col m-8 w-[611px] h-[746.922x]'>
                <img
                    src={sandals}
                    alt='girl in sandals'
                    className='object-cover w-[692.984px] h-[518px] pr-8'
                />
                <a href='/api/product/category/sandals'>
                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Sandals</button>
                </a>
            </div>
            </div>

{/* Section 2 */}
            <div>
                <div className='flex flex-row px-24'>
                    <div className='grow'>
                    <div className='mt-24 mb-56 pr-80'>
                        <img
                            src={shoeDisplay}
                            alt='hero banner'
                            className='object-cover w-[997.219px] h-[804.438px]'
                        />
                        <div className='mt-12'>
                        <p className='text-xl font-semibold uppercase'>Focused on high quality manufacturing and design.</p>
                        </div>
                    </div>
                        </div>

                        <div className='grow'>
                    <div className='mt-64 mb-96'>
                        <p className='text-xl font-light mb-2'>Built for comfort</p>
                        <img
                            src={homeDisplay}
                            alt='hero banner'
                            className='object-cover w-[621.719px] h-[464.672px]'
                        />
                        <a href='/api/product/category/sale'>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2'>On Sale</button>
                        </a>
                    </div>
                        </div>
                </div>
            </div>
        </div>
    );

}

export default HomeDisplay;
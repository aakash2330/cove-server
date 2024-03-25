import heels from '../images/heels.jpg';
import homeDisplay from '../images/home-display.jpg';
import sandals from '../images/sandals.jpg';
import shoeDisplay from '../images/shoe-display.jpg';
import sneakers from '../images/sneakers.jpg';
import '../index.css';


function HomeDisplay() {
    return (
        <div>
            <div className='flex flex-row justify-center pt-14'>
            <div className='flex-col border-solid border-2 border-blue-400 m-8 h-[611px] w-[746.922x]'>
                <img
                    src={sneakers}
                    alt='guy in sneakers'
                    className='object-cover h-[518px] w-[692.984px] border-solid border-2 border-red-400 pr-8'
                />
                <p className='text-sml mt-4'>Sneakers</p>
                <p className='my-1'>→</p>
            </div>
            <div className='flex-col border-solid border-2 border-blue-400 m-8 h-[611px] w-[746.922x]'>
                <img
                    src={heels}
                    alt='girl in heels'
                    className='object-cover h-[518px] w-[692.984px] border-solid border-2 border-red-400 pr-8'
                />
                <p className='text-sml mt-4'>Heels</p>
                <p className='my-1'>→</p>
            </div>
            <div className='flex-col border-solid border-2 border-blue-400 m-8 h-[611px] w-[746.922x]'>
                <img
                    src={sandals}
                    alt='girl in sandals'
                    className='object-cover h-[518px] w-[692.984px] border-solid border-2 border-red-400 pr-8'
                />
                <p className='text-sml mt-4'>Sandals</p>
                <p className='my-1'>→</p>
            </div>
            </div>

            <div>
                <div className='flex flex-row px-36'>
                    <div className='mt-24 mb-56 w-1/2 mr-80'>
                        <img
                            src={shoeDisplay}
                            alt='hero banner'
                            className='object-cover h-[804.438px] w-[997.219px] border-solid border-2 border-red-400'
                        />
                        <div className='mt-20'>
                        <p className='font-2xl font-bold uppercase'>Focused on high quality manufacturing and design.</p>
                        </div>
                    </div>
                    <div className='h-1/4 mt-64 mb-96 w-1/2'>
                        <p className='font-2xl mb-2 font-bold'>Built for comfort</p>
                        <img
                            src={homeDisplay}
                            alt='hero banner'
                            className='object-cover h-[464.672px] w-[621.719px] border-solid border-2 border-red-400'
                        />
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2'>On Sale</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeDisplay;
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
            <div className='flex-col border-solid border-2 border-blue-400 m-8 w-[550px] h-[748px]'>
                <img
                    src={sneakers}
                    alt='guy in sneakers'
                    className='object-cover object-center w-[518px] h-[692.99px] border-solid border-2 border-red-400 px-8'
                />
                <p className='text-2xl mt-4'>Sneakers</p>
                <p className='my-1'>Arrow</p>
            </div>
            <div className='flex-col border-solid border-2 border-blue-400 m-8 w-[550px] h-[748px]'>
                <img
                    src={heels}
                    alt='girl in heels'
                    className='object-cover object-center w-[518px] h-[692.99px]  border-solid border-2 border-red-400 px-8'
                />
                <p className='text-2xl mt-4'>Heels</p>
                <p className='my-1'>Arrow</p>
            </div>
            <div className='flex-col border-solid border-2 border-blue-400 m-8 w-[550px] h-[748px]'>
                <img
                    src={sandals}
                    alt='girl in sandals'
                    className='object-cover object-center w-[518px] h-[692.99px]  border-solid border-2 border-red-400 px-8'
                />
                <p className='text-2xl mt-4'>Sandals</p>
                <p className='my-1'>Arrow</p>
            </div>
            </div>

            <div>
                <div className='flex flex-row px-36'>
                    <div className='border-b border-slate-300 mt-24 mb-56 w-1/2 mr-80'>
                        <img
                            src={shoeDisplay}
                            alt='hero banner'
                            className='object-fit object-left h-[904px] w-[997px] border-solid border-2 border-red-400'
                        />
                        <p>Focused on high quality manufacturing and design</p>
                    </div>
                    <div className='border-b border-slate-300 h-1/4 mt-64 mb-96 w-1/2'>
                        <p>Built for comfort</p>
                        <img
                            src={homeDisplay}
                            alt='hero banner'
                            className='object-fit object-left h-[599.92px] w-[450px] border-solid border-2 border-red-400'
                        />
                        <button>On Sale</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeDisplay;
import { motion } from 'framer-motion';
import heels from '../images/heels.jpg';
import homeDisplay from '../images/home-display.jpg';
import sandals from '../images/sandals.jpg';
import shoeDisplay from '../images/shoeDisplay.png';
import sneakers from '../images/sneakers.jpg';
import '../index.css';

function HomeDisplay() {
    return (
        // section 1
        <div>
            <div className='flex flex-row justify-evenly pt-14'>
                <motion.div
                    className='flex-col m-8 w-[611px] h-[746.922x]'
                    animate={{
                        x: ['-100%', '0%'],
                        opacity: [0, 1]
                    }}
                    transition={{ duration: 2, ease: 'linear' }}
                >
                    <img
                        src={sneakers}
                        alt='guy in sneakers'
                        className='object-cover w-[692.984px] h-[518px] pr-8'
                    />
                    <a href='/api/product/category/sneakers'>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Sneakers</button>
                    </a>
                </motion.div>
                <motion.div
                    className='flex-col m-8 w-[611px] h-[746.922x]'
                    animate={{
                        x: ['-100%', '0%'],
                        opacity: [0, 1]
                    }}
                    transition={{ duration: 2, ease: 'linear' }}
                >
                    <img
                        src={heels}
                        alt='girl in heels'
                        className='object-cover w-[692.984px] h-[518px] pr-8'
                    />
                    <a href='/api/product/category/heels'>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Heels</button>
                    </a>
                </motion.div>
                <motion.div
                    className='flex-col m-8 w-[611px] h-[746.922x]'
                    animate={{
                        x: ['-100%', '0%'],
                        opacity: [0, 1]
                    }}
                    transition={{ duration: 2, ease: 'linear' }}
                >
                    <img
                        src={sandals}
                        alt='girl in sandals'
                        className='object-cover w-[692.984px] h-[518px] pr-8'
                    />
                    <a href='/api/product/category/sandals'>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2 w-1/3'>Sandals</button>
                    </a>
                </motion.div>
            </div>

            {/* Section 2 */}
            <div>
                <div className='flex flex-row px-24'>
                    <div className='grow'>
                        <motion.div
                            className='my-24 pr-80'
                            animate={{
                                x: ['-100%', '0%'],
                                opacity: [0, 1]
                            }}
                            transition={{ duration: 2, ease: 'linear' }}
                        >
                            <img
                                src={shoeDisplay}
                                alt='hero banner'
                                className='object-cover w-[980px] h-[700px]'
                            />
                            <div>
                                <p className='text-xl font-semibold uppercase'>Focused on high quality manufacturing and design.</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className='grow'>
                        <motion.div
                            className='mt-64 mb-96'
                            animate={{
                                x: ['-100%', '0%'],
                                opacity: [0, 1]
                            }}
                            transition={{ duration: 2, ease: 'linear' }}
                        >
                            <p className='text-xl font-light mb-2'>Built for comfort</p>
                            <img
                                src={homeDisplay}
                                alt='hero banner'
                                className='object-cover w-[621.719px] h-[464.672px]'
                            />
                            <a href='/api/product/category/sale'>
                                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2'>On Sale</button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default HomeDisplay;
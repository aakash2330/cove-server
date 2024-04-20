import { motion } from 'framer-motion';
import '../index.css';

function Advertisement() {

    return(
        <>
        <div className='flex justify-center bg-black'>
        <motion.div
            className='py-14 text-white text-xl uppercase antialiased font-bold flex flex-row whitespace-nowrap'
            animate = {{ x: ['0%', '-30%']}}
            transition = {{ repeat: Infinity, repeatType: 'loop', duration: 15, ease: 'linear' }}
        >
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
            <p className='px-2 grow'>USE CODE: JOY45 / SALE / 20% OFF ON SNEAKERS</p>
        </motion.div>
        </div>
        </>
    );
}

export default Advertisement;
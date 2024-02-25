import tempImg from '../images/asset26.png';
import '../index.css';

function Women() {
    return(
        <div className='flex border-solid border-2 border-orange-400 m-8'>
        <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
            <img src={tempImg} alt='placeholder template' />
            <p className='text-2xl mt-4'>Linen Top / Blue</p>
            <p className='my-1'>$50.00</p>
        </div>
        <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
            <img src={tempImg} alt='placeholder template' />
            <p className='text-2xl mt-4'>Linen Top / Blue</p>
            <p className='my-1'>$50.00</p>
        </div>
        <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
            <img src={tempImg} alt='placeholder template' />
            <p className='text-2xl mt-4'>Linen Top / Blue</p>
            <p className='my-1'>$50.00</p>
        </div>
        <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
            <img src={tempImg} alt='placeholder template' />
            <p className='text-2xl mt-4'>Linen Top / Blue</p>
            <p className='my-1'>$50.00</p>
        </div>
        </div>
    );
}

export default Women;
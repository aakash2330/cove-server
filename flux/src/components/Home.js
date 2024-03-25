import heroLeft from '../images/banner-left.png';
import heroRight from '../images/banner-right.png';
import '../index.css';


function Home() {
    return (
        <div className='grid grid-cols-2 border-b border-slate-300 h-1/4'>
            <img
                src={heroLeft}
                alt='hero banner'
                className='object-cover h-[675px] w-[900px] border-solid border-2 border-red-400'
            />
            <img
                src={heroRight}
                alt='hero banner zoomed in'
                className='object-cover h-[675px] w-[900px] border-solid border-2 border-red-400'
            />
        </div>

    );

}

export default Home;
import heroZoomed from '../images/hero-banner-zoomed.jpg';
import hero from '../images/hero-banner.jpg';
import '../index.css';


function Home() {
    return (
        <div className='flex border-b border-slate-300 h-1/4'>
            <img
                src={hero}
                alt='hero banner'
                className='object-fit object-left w-1/2 max-h-full border-solid border-2 border-red-400'
            />
            <img
                src={heroZoomed}
                alt='hero banner zoomed in'
                className='object-fill object-right w-1/2 max-h-full border-solid border-2 border-red-400'
            />
        </div>

    );

}

export default Home;
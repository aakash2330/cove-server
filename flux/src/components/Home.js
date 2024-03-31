import heroLeft from '../images/banner-left.png';
import heroRight from '../images/banner-right.png';
import '../index.css';


function Home() {
    return (
        <div className='grid grid-cols-2 h-1/4'>
            <img
                src={heroLeft}
                alt='hero banner'
                className='object-cover h-[675px] w-[900px]'
            />
            <img
                src={heroRight}
                alt='hero banner zoomed in'
                className='object-cover h-[675px] w-[900px]'
            />
        </div>

    );

}

export default Home;
import hero from '../images/Banner-Hero.png';
// import heroRight from '../images/banner-right.png';
import '../index.css';


function Home() {
    return (
        <div className='flex grow h-1/4'>
            <img
                src={hero}
                alt='hero banner'
                className='object-cover'
            />
            </div>
    );

}

export default Home;
import { Link } from 'react-router-dom';
import '../index.css';

function NotFound() {

    return(
        <div className='flex grow flex-col justify-center items-center h-1/2 w-full xl:my-24'>
            <h2 className='mt-16 mb-8 text-5xl md:text-6xl font-semibold uppercase'>Page Not Found!</h2>
            <p className='my-8 text-4xl md:text-5xl font-semibold'>I'm sorry user, we're afraid that this page does not exist.🙁</p>
            <p className='my-8 text-3xl md:text-4xl'>Lets head back: <Link to='/'><span className='underline'>Home Page</span></Link>.</p>
        </div>
    );
}

export default NotFound;
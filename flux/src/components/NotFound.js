import { Link } from 'react-router-dom';
import '../index.css';

function NotFound() {

    return(
        <div className='flex grow flex-col justify-center items-center h-1/2 w-full border border-orange-400 border-solid'>
            <h2>Page Not Found!</h2>
            <p>I'm sorry user, we're afraid that this page does not exist.🙁</p>
            <p>Lets head back: <Link to='/'>Home Page</Link>.</p>
        </div>
    );
}

export default NotFound;
import { Link } from 'react-router-dom';
import '../index.css';


function Shop() {

    return(
        <div className='flex border-b border-slate-300 justify-center m-4 md:m-16 py-4 md:py-16 text-sm md:text-base'>
            <div>
            <Link to={`/api/product/category/sale`}>
            <p className='mx-2 md:mx-7 block'>Sale</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/sneakers`}>
            <p className='mx-2 md:mx-7 block'>Sneakers</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/sandals`}>
            <p className='mx-2 md:mx-7 block'>Sandals</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/flats`}>
            <p className='mx-2 md:mx-7 block'>Flats</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/boots`}>
            <p className='mx-2 md:mx-7 block'>Boots</p>
            </Link>
            </div>
        </div>
        
    );
    
}

export default Shop;
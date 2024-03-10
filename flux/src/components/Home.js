import { Link } from 'react-router-dom';
import '../index.css';
// import React, { useState } from 'react';
// import Women from './Women';


function Home() {
//     const [link, setLink] = useState(false);
    
//     const handleCategories= () => {
//      setLink(!link);
//     }

    return(
        <div className='flex border-b border-slate-300 justify-center m-16 py-16 text-base'>
           {/* Sale isnt working yet (maybe add a boolean to the seeds) */}
            <div>
            <Link to={`/api/product/category/sale`}>
            <p className='mx-7'>Sale</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/sneakers`}>
            <p className='mx-7'>Sneakers</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/sandals`}>
            <p className='mx-7'>Sandals</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/flats`}>
            <p className='mx-7'>Flats</p>
            </Link>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <Link to={`/api/product/category/heels`}>
            <p className='mx-7'>Heels</p>
            </Link>
            </div>
        </div>
        
    );
    
}

export default Home;
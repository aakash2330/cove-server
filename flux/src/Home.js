import './index.css';
// import React, { useState } from 'react';
// import Women from './Women';


function Home() {
//     const [link, setLink] = useState(false);
    
//     const handleCategories= () => {
//      setLink(!link);
//     }

    return(
        <div className='flex border-b border-slate-300 justify-center m-16 py-16 text-base'>
            {/* <div className='Categories flex-row border-solid border-2 border-green-300'> */}
            <div>
            <p className='mx-7'>Sale</p>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            {/* <p className='mx-7' onClick={handleCategories}>Women</p> */}
            <p className='mx-7'>Women</p>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <p className='mx-7'>Men</p>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <p className='mx-7'>Kids</p>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <p className='mx-7'>Baby</p>
            </div>
            <div className='border-r border-slate-300 py-1'></div>
            <div>
            <p className='mx-7'>Sport</p>
            </div>
            {/* </div> */}
            {/* <div className='CatgeoryDisplay'>
                {link && <Women />}
            </div> */}
        </div>
        
    );
    
}

export default Home;
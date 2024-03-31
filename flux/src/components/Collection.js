import React, { useState } from 'react';
import one from '../images/collection/1.jpg';
import ten from '../images/collection/10.jpg';
import two from '../images/collection/2.jpg';
import three from '../images/collection/3.jpg';
import four from '../images/collection/4.jpg';
import five from '../images/collection/5.jpg';
import six from '../images/collection/6.jpg';
import seven from '../images/collection/7.jpg';
import eight from '../images/collection/8.jpg';
import nine from '../images/collection/9.jpg';
import '../index.css';

function Collection() {
    const images = [one, two, three, four, five, six, seven, eight, nine, ten];
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const subOne = async () => {
        if(currentIndex > 0) {
    setCurrentIndex(currentIndex -1);
        } else {
            setCurrentIndex(9);
            console.log(currentIndex);
        }
    
        }
    

    const addOne = async () => {
        if(currentIndex < 9) {
            setCurrentIndex(currentIndex + 1);
        } else {
            //Starting over if the current index hits 9
          setCurrentIndex(0);
            console.log(currentIndex);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>
        <div>
            <p className='text-xl font-semibold pt-4 uppercase'>Embrace your creativity</p>
        </div>
        <div className='flex flex-row items-center justify-center'>
            <button className=' inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mx-2' onClick={subOne}>&lt;</button>
            <div className='mt-12 mb-14 w-1/2'>
                <img
                    src={images[currentIndex]}
                    alt='collection images'
                    className='object-fit h-[691.219px] w-[810px]'
                />
                <p className='pt-4 text-base'>Focused on high quality manufacturing and design</p>
            </div>
            <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mx-2' onClick={addOne}>&gt;</button>
        </div>
</div>
    );

}

export default Collection;
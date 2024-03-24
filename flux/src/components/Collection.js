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
        <div className='flex flex-col items-center justify-center  border-solid border-2 border-blue-500'>
        <div>
            <p>New Arrivals</p>
        </div>
        <div className='flex flex-row items-center justify-center'>
            <button className='bg-gray-300 text-black text-lg py-2 px-2' onClick={subOne}>&lt;</button>
            <div className='border-b border-slate-300 mt-24 mb-56 w-1/2'>
                <img
                    src={images[currentIndex]}
                    alt='collection images'
                    className='object-fit h-[691.219px] w-[810px] border-solid border-2 border-red-400'
                />
                <p>Focused on high quality manufacturing and design</p>
            </div>
            <button className='bg-gray-300 text-black text-lg py-2 px-2' onClick={addOne}>&gt;</button>
        </div>
        <div>
        <p>Coming soon</p>
        </div>
</div>
    );

}

export default Collection;
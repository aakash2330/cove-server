import grid1 from '../images/footer1.jpg';
import grid2 from '../images/footer2.jpg';
import grid3 from '../images/footer5.jpg';
import grid4 from '../images/footer6.jpg';
import '../index.css';


function FooterAd () {
    // can probably add a function to change on state for images
    return(
<div className='grid grid-cols-4 gap-0'>
<img
        src={grid1}
        alt='hero banner'
        className='object-cover h-[210px] md:h-[410px] w-full'
    />
<img
        src={grid2}
        alt='hero banner'
        className='object-cover h-[210px] md:h-[410px] w-full'
    />
<img
        src={grid3}
        alt='hero banner'
        className='object-cover h-[210px] md:h-[410px] w-full'
    />
<img
        src={grid4}
        alt='hero banner'
        className='object-cover h-[210px] md:h-[410px] w-full'
    />
</div>
    );
}


export default FooterAd;
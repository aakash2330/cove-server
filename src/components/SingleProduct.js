import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../index.css';

//Try calling the set amount use state from here
const SingleProduct = ({ isLoggedIn, username, setCartItems }) => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [counter, setCounter] = useState(1);
    const [addBtn, setAddBtn] = useState('Add To Cart');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // if(product.length === 0) {
                const response = await fetch(`http://localhost:3001/api/product/${productId}`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Data from API:', data);
                setProduct(data);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Could not fetch data');
            } 
        };

        fetchData();
    }, [productId]);

    const addToCart = async (productData) => {
        try {
            const token = Cookies.get('token');
            console.log('Getting token from singleProduct: ', token);
            const showUserName = username;
            console.log('Seeing if username has a value: ', showUserName);
            const showProductId = productId;
            console.log('Seeing if product id has a value: ', showProductId);

            const selectSizeEl = document.getElementById('shoe-size');
            const size = selectSizeEl.value;

            if (!token) {
                throw new Error('Authentication token not found');
            }

            const response = await fetch('http://localhost:3001/auth/user/addCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    img: productData.img,
                    title: productData.title,
                    price: productData.price,
                    size: size,
                    quantity: counter,
                    username,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Cart Response Data After Pressing the add button: ', responseData);
                setCartItems(responseData);
            } else {
                const errorData = await response.json();
                console.error('Failed to add to Cart', errorData.message);
            }
        } catch (error) {
            console.error('Error adding to cart: ', error.message);
        }
    };
    
    const addCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    }
    
    const subCounter = () => {
        if (counter > 0) {
            setCounter(prevCounter => prevCounter - 1);
        }
    }

    const handleClick = () => {
        navigate('/cart');
      };

    const handleSignIn = () => {
        navigate('/auth/login');
      };

    const displayMessage = () => {
        //Changing button to adding
       setAddBtn('Adding...')
       setTimeout(() => {
        //After one second it says added
        setAddBtn('Added');
        setTimeout(() => {
            //Then it changes back to Add to cart
            setAddBtn('Add To Cart');
        }, 1000);
       }, 1000);
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    //probably return an error 404 page right here
    if (!product || Object.keys(product).length === 0) {
        return <p>Product not found</p>;
    }
    return (
        <>
            {/*displaying shop - title */}
            <div className='flex flex-row mt-8'>
                <Link to={`/shop`}>
                    <p className='ml-8 pr-2 text-base font-light'>Shop</p>
                </Link>
                <p className='text-base font-light'>&gt;</p>
                <p className='px-2 text-base font-light'>{product.title}</p>
            </div>
            {/*product picture */}
            <div className='flex flex-col md:flex-row m-8'>

                <div className='grow mb-8 md:mb-0 md:mr-8 w-full md:w-[669px] md:h-[444px] bg-[#efefef]'>
                    <img
                        src={`/${product.img}`}
                        alt='placeholder template'
                        className='object-contain object-center w-full h-full'
                    />
                </div>
                {/* product information */}
                <div className='flex-col grow m-8'>
                    <p className='text-xl font-light mt-4 mb-2'>{product.title}</p>
                    <p className='my-2 text-lg font-semibold'>${product.price}.00</p>
                    <p className='my-2 text-sm font-light'>{product.description}</p>
                    <p className='my-1'>__</p>
                    <p className='text-sm font-light underline my-1'>Size Guide</p>
                    <div className='flex flex-col'>
                        <label for='shoe-size' className='font-semibold text-sm my-1'> Size: </label>
                        <select name='shoe-size' id='shoe-size' className='border border-black text-sm font-semibold my-1'>
                            <option value='0'>Select Size</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-1 px-3 mt-4' onClick={subCounter}>-</button>
                        <p className='p-1 mt-4'>Quantity: {counter}</p>
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-1 px-3 mt-4' onClick={addCounter}>+</button>
                    </div>

                    {isLoggedIn ? (
                        <>
                            <div className='flex flex-row'>
                                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-8' 
                                onClick={() => {
                                    addToCart(product);
                                    displayMessage();
                                }}>{addBtn}</button>
                                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-8 ml-2' onClick={handleClick}>Go to Cart</button>
                            </div>
                        </>
                    ) : (
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-8 md:text-base sm:tex-sm' onClick={handleSignIn}>Sign in to add to Cart</button>
                    )}
                </div>

            </div>
        </>
    );
}

export default SingleProduct;
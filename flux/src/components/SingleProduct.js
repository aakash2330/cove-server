import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';

const SingleProduct = ({ isLoggedIn, username }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/product/${productId}`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Data from API:', data);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Could not fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const addToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Getting token from singleProduct: ', token);
            const showUserName = username;
            console.log('Seeing if username has a value: ', showUserName);
            const showProductId = productId;
            console.log('Seeing if product id has a value: ', showProductId);

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
                    img: product.img,
                    title: product.title,
                    newPrice: product.newPrice,
                    username,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Cart Response Data: ', responseData)
            } else {
                const errorData = await response.json();
                console.error('Failed to add to Cart', errorData.message);
            }
        } catch (error) {
            console.error('Error adding to cart: ', error.message);
        }
    };

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Shoes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    if (!product || Object.keys(product).length === 0) {
        return <p>Product not found</p>;
    }
    return (
        <>
            <div className='flex flex-row'>
                <Link to={`/shop`}>
                    <p className='ml-8 pr-2'>Shop</p>
                </Link>
                <p>&gt;</p>
                <p className='px-2'>{product.title}</p>

            </div>
            <div className='flex flex-row border-solid border-2 border-orange-400 m-8'>

                <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                    <img
                        src={product.img}
                        alt='placeholder template'
                        className='object-cover object-center w-[669px] h-[444px] border-solid border-2 border-red-400'
                    />
                </div>

                <div className='h-[708px] w=[535px]'>
                    <p className='text-2xl mt-4'>{product.title}</p>
                    <p className='my-1'>${product.newPrice}</p>
                    <p className='my-1'>{product.description}</p>
                    <p>----</p>
                    <p>Size Guide</p>
                    <div className='flex flex-col'>
                        <label for="shoe-size"> Size: </label>
                        <select name="shoe-size" id="shoe-size" className='border-2 border-black'>
                            <option value="select-size">Select Size</option>
                            <option value="shoe-five">5</option>
                            <option value="shoe-six">6</option>
                            <option value="shoe-seven">7</option>
                            <option value="shoe-eight">8</option>
                            <option value="shoe-nine">9</option>
                            <option value="shoe-ten">10</option>
                            <option value="shoe-eleven">11</option>
                            <option value="shoe-twelve">12</option>
                            <option value="shoe-thirteen">13</option>
                            <option value="shoe-fourteen">14</option>
                        </select>
                    </div>
                    <div className='flex flex-row'>
                        <button className='bg-black text-white'>-</button>
                        <p>Quantity:</p>
                        <button className='bg-black text-white'>+</button>
                    </div>

                    {isLoggedIn ? (
                        <>
                            <div>
                                <button className='bg-black text-white' onClick={addToCart}>Add to Cart</button>
                            </div>
                        </>
                    ) : (
                        <button className='bg-black text-white'>Sign in to add to Cart</button>
                    )}
                </div>

            </div>
        </>
    );
}

export default SingleProduct;
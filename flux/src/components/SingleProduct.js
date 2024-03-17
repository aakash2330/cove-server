import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        
            const response = await fetch('http://localhost:3001/auth/addCart', {
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

            if(response.ok) {
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
    if(!product || Object.keys(product).length === 0){
        return <p>Product not found</p>;
    }
    return (
        <>
        <div className='flex flex-wrap border-solid border-2 border-orange-400 m-8'>
                
                    <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                        <img
                            src={product.img}
                            alt='placeholder template'
                            className='object-cover object-center max-w-full max-h-full border-solid border-2 border-red-400'
                        />
                        <p className='text-2xl mt-4'>{product.title}</p>
                        <p className='my-1'>${product.newPrice}</p>
                    </div>
                
        </div>
        { isLoggedIn ? (
            <>
        <div>
            <button onClick = {addToCart}>Add to Cart</button>
        </div>
            </>
        ): (
            <p>Sign in to add to Cart</p>
        )}
        </>
    );
}

export default SingleProduct;
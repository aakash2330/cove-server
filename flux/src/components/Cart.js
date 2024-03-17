import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const Cart = ({ username }) => {
    const { productId } = useParams();
    const [cartItems, setCartItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Fetching the items that are existing in the cart
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/auth/cart`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Cart Data from API:', data); 
                setCartItems(data);
            } catch (error) {
                console.error('Error fetching cart data:', error);
                setError('Could not fetch cart data');
            } finally {
                setLoading(false);
            }
        };

        fetchCartData();
    }, [username]); 

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Cart...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    if(!cartItems || Object.keys(cartItems).length === 0){
        return <p>No products in the cart</p>;
    }
    return (
        <div className='flex flex-wrap border-solid border-2 border-orange-400 m-8'>
            {cartItems.map((item) => (
                <div key={item.productId} className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                    <img
                        src={item.img}
                        alt='placeholder template'
                        className='object-cover object-center max-w-full max-h-full border-solid border-2 border-red-400'
                    />
                    <p className='text-2xl mt-4'>{item.title}</p>
                    <p className='my-1'>${item.newPrice}</p>
                </div>
            ))}
        </div>
    );
}

export default Cart;
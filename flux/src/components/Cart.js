import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Cart = ({ username }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    //Fetching the items that are existing in the cart
    const fetchCartData = async () => {
        if (cartItems.length === 0) {
            try {
                const response = await fetch(`http://localhost:3001/auth/user/cart`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
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
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [username]);

    const deleteOneCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3001/auth/user/deleteOneCart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });
            if (!response.ok) {
                throw new Error(`Network response error: ${response.statusText}`);
            }
            console.log('Single item deleted');
            //Fetching data after deletion
            fetchCartData();
        } catch (error) {
            console.error('Error deleting cart data:', error);
            setError('Could not delete cart data');
        } finally {
            setLoading(false); //End loading after request
        }
    }

    const deleteAllCart = async () => {
        try {
            const response = await fetch(`http://localhost:3001/auth/user/deleteAllCart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: null,
            });
            if (!response.ok) {
                throw new Error(`Network response error: ${response.statusText}`);
            }

            console.log('All items deleted');
            //Fetching data after deletion
            await fetchCartData();
        } catch (error) {
            console.error('Error deleting the cart data:', error);
            setError('Could not delete the cart data');
        } finally {
            setLoading(false);
        }
    }

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Cart...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    //Array.isArray is a built in method to check to see if something is an array
    if (!Array.isArray(cartItems) || Object.keys(cartItems).length === 0) {
        return (
            <>
                <p>Shopping Cart</p>
                <p>You have nothing in your shopping cart</p>
                <Link to={`/shop`}>
                    <button className='bg-black text-white'>Continue Shopping</button>
                </Link>
            </>
        );
    }
    // Add cart item price adding functionalities 
    // probably store the information in an array then add them to do the total score 
    // then checkout button.
    return (
        <div className='m-4'>
            <div className='ml-8 mb-6'>
                <p className='text-2xl font-semibold uppercase'>Shopping Cart</p>
            </div>
            <div className='flex flex-col'>
                {/* Product Information */}
                {cartItems.map((item) => (
                    <div key={item.productId} className='flex flex-col grow mx-8 h-1/3'>
                        <div className='flex flex-row'>
                            <div className='flex flex-row'>
                                <img
                                    src={item.productImage}
                                    alt='placeholder template'
                                    className='object-scale-down w-[150px] h-[150px] bg-[#efefef]'
                                />
                                <div className='flex-col ml-4'>
                                    <p className='text-base font-medium mt-4'>{item.productTitle}</p>
                                    {/* change this to product size when fixed */}
                                    <p className='my-1 text-sm font-light'>Item Amount: {item.quantity}</p>
                                    <p className='my-1 text-sm font-light text-gray-600'>Size: {item.productSize}</p>
                                </div>
                            </div>
                            {/* Quantity section */}
                            <div className='flex flex-row grow my-8 w-96 h-1/3'>
                                <div className='flex flex-row grow justify-end'>
                                <button className='font-medium text-xl text-slate-600 mx-2' >-</button>
                                {/* Add an amount variable to change based on the quantity  */}
                                <p className='pt-5 text-base'>1</p>
                                <button className='font-medium text-xl text-slate-600 mx-2' >+</button>
                                </div>
                                {/* Price section */}
                                <div className='flex flex-row grow justify-end'>
                                    <p className='inline-block my-1 font-light text-base mt-2 py-3.5'>${item.productPrice}</p>
                                    {/* Remove item button  */}
                                    <button className='inline-block font-medium py-3.5 px-3 mt-2' onClick={() => deleteOneCart(cartItems.productId)}>X</button>
                                </div>
                            </div>
                        </div>
                        {/* Border */}
                        <div className='border border-b border-slate-300 my-4'></div>
                    </div>
                ))}
            </div>
            {/* Subtotal price section */}
            <div className='flex justify-end mt-8 mb-2 mx-8'>
                <div className='flex flex-row w-1/2'>
                    <div className='flex grow'>
                <p className='pl-1'>Subtotal Price: </p>
                    </div>
                <div className='flex grow justify-end'>
                <p>Value</p>
                </div>
                </div>
            </div>
            {/* container for empty cart and checkout button */}
            <div className='flex flex-row mb-8 mx-8'>
                <div className='grow'>
                    <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-1.5 px-6 mt-2 w-1/2' onClick={() => deleteAllCart()}>Empty Cart</button>
                </div>
                <div className='flex grow justify-end'>
                    <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-1.5 px-6 mt-2 w-1/2' onClick={() => deleteAllCart()}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
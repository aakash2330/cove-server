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
        <div className='border-solid border-2 border-orange-400 m-4'>
            <div className='flex flex-row'>
                <div>
                    <p>Shopping Cart</p>
                </div>
                {/* Product Information */}
                {cartItems.map((item) => (
                    <div key={item.productId} className='flex-row border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                        <img
                            src={item.productImage}
                            alt='placeholder template'
                            className='object-fit w-[100px] h-[100px] border-solid border-2 border-red-400'
                        />
                        <div className='flex-col'>
                            <p className='text-sm text-light mt-4'>{item.productTitle}</p>
                            {/* change this to porduct size when fixed */}
                            <p className='my-1 text-sm text-light'>${item.productPrice}</p>
                        </div>
                        <p className='my-1'>Item Amount: {item.quantity}</p>
                    </div>
                ))}
                <div className='flex flex-row border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                    <button className=' inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mx-2' >&lt;</button>
                    {/* Add an amount variable to change based on the quantity  */}
                    <p className='pt-4 text-base'>1</p>
                    <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mx-2' >&gt;</button>
                    <div>
                        {/* Remove item button  */}
                        <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2' onClick={() => deleteOneCart(cartItems.productId)}>X</button>
                    </div>
                </div>
            </div>
            <div className='border border-b border-gray-400 mx-4'></div>
            <div>
                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2' onClick={() => deleteAllCart()}>Empty Cart</button>
            </div>
            <div>
                <p>Subtotal Price</p>
                <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-3.5 px-6 mt-2' onClick={() => deleteAllCart()}>Checkout</button>
            </div>
        </div>
    );
}

export default Cart;
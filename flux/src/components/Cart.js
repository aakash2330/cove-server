import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../functions/loader';
import '../index.css';

const Cart = ({ username }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [totalPrice, setTotalPrice] = useState(0);

    //Fetching the items that are existing in the cart
    const fetchCartData = async () => {
        if (cartItems.length === 0) {
            try {
                const response = await fetch(`http://localhost:3001/auth/user/cart`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'Cache-Control': 'no-cache',
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
        //Running calculate total price to get the new value from the state
        calculateTotalPrice();
    }, [cartItems]);

    const deleteOneCart = async (cartId) => {
        try {
            //Setting loading to true before the request
            setLoading(true);

            const response = await fetch(`http://localhost:3001/auth/user/deleteOneCart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Cache-Control': 'no-cache', // This tells server not to use Cached Response
                },
                body: JSON.stringify({ cartId: cartId.toString() }),
            });
            if (!response.ok) {
                throw new Error(`Network response error: ${response.statusText}`);
            }

            //Removing the deleted item from cartItems state
            //Throwing the arrow function in setCarItems will make the parameter represent the last state as the argument
            setCartItems(prevItem => prevItem.filter(item => item._id !== cartId));
            setLoading(false); //End loading after request
        } catch (error) {
            console.error('Error deleting cart data:', error);
            setError('Could not delete cart data');
            setLoading(false); //End loading after error
        }
    }

    const checkoutCart = async () => {
        console.log('Checkout for now!');

    }

    const calculateTotalPrice = () => {
        // Check if cart is defined and is an array
        if (cartItems && Array.isArray(cartItems)) {
            let addedValue = 0;
            console.log('This is to check the calculated price to see if cartItems is actually printing something worth while: ', cartItems);
            for (let i = 0; i < cartItems.length; i++) {
                // Check if cart[i] is not undefined before accessing its properties
                if (cartItems[i] && cartItems[i].productPrice) {
                    addedValue += cartItems[i].productPrice;
                }
            }

            setTotalPrice(addedValue);

            console.log('total price working');
        } else {
            setTotalPrice(0);
        }
    }

    const quantityUpdater = async (prodId, img, title, price, size, quantity, updatedQuantity) => {
        try {
            const token = localStorage.getItem('token');
            console.log('Getting token from singleProduct: ', token);
            const showUserName = username;
            console.log('Seeing if username has a value: ', showUserName);
            const showProductId = prodId;
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
                    productId: prodId,
                    img: img,
                    title: title,
                    price: price,
                    size: size,
                    quantity: updatedQuantity,
                    username,
                }),
            });

            if (!response.ok) {
                throw new Error(`Network response error: ${response.statusText}`);
            }

            // Update cartItems state with the new data (forcing state to re-render because it didn't recognize the data response)
            const updatedCartItems = cartItems.map(item => {
                if (item.productId === prodId && item.productSize === size) {
                    // Update quantity for matching product ID and size
                    return {
                        ...item,
                        quantity: updatedQuantity
                    };
                }
                // Return unchanged item for other items
                return item;
            });

            setCartItems(updatedCartItems);
            calculateTotalPrice();
        } catch (error) {
            console.error('Error adding to cart: ', error.message);
        }
    };


    const handleAddCounter = (prodId, img, title, price, size, quantity) => {
        const updatedQuantity = quantity + 1;
        quantityUpdater(prodId, img, title, price, size, quantity, updatedQuantity);
    }

    const handleSubCounter = (prodId, img, title, price, size, quantity) => {
        if (quantity > 0) {
            const updatedQuantity = quantity - 1;
            quantityUpdater(prodId, img, title, price, size, quantity, updatedQuantity);
        }
    }

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    //Array.isArray is a built in method to check to see if something is an array
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
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
                {/* Trying to retrieve index number */}
                {cartItems.map((item, index) => (
                    <div key={item.productId} className='flex flex-col grow mx-8 h-1/3'>
                        <div className='flex flex-row'>
                            <div className='flex flex-row grow-2'>
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
                            <div className='flex flex-row w-1/3 my-8 h-1/3'>
                                <div className='flex flex-row mt-5'>
                                    <button className={`inline-flex items-center justify-center font-medium text-xl text-slate-600 mx-2 h-8 w-8 hover:border 
                                    hover:bg-gray-300 hover:border-gray-300 hover:rounded-full
                                    ${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => {
                                            handleSubCounter(item.productId, item.productImage, item.productTitle, item.productPrice, item.productSize, item.quantity)
                                        }
                                        }>-</button>
                                    {/* Add an amount variable to change based on the quantity  */}
                                    <p className='text-base pt-1'>{item.quantity}</p>
                                    <button className='inline-flex items-center justify-center font-medium text-xl text-slate-600 mx-2 h-8 w-8 hover:border hover:bg-gray-300 hover:border-gray-300 hover:rounded-full' onClick={() => {
                                        handleAddCounter(item.productId, item.productImage, item.productTitle, item.productPrice, item.productSize, item.quantity)
                                    }
                                    }>+</button>
                                </div>
                                {/* Price section */}
                                <div className='flex flex-row grow justify-end'>
                                    <p className='inline-block my-1 font-light text-base mt-2 py-3.5'>${item.productPrice}</p>
                                    {/* Remove item button  */}
                                    {/* Make this delete the object */}
                                    <button className='inline-flex items-center justify-center font-medium py-3.5 px-3 mt-5 h-7 w-7 hover:border hover:bg-gray-300 hover:border-gray-300 hover:rounded-full' onClick={() => deleteOneCart(item._id)}>X</button>
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
                        <p className='pl-1 text-md font-thin'>Subtotal Price: </p>
                    </div>
                    <div className='flex grow justify-end'>
                        <p className='text-xl font-semibold'>${totalPrice}.00</p>
                    </div>
                </div>
            </div>
            {/* container for empty cart and checkout button */}
            <div className='flex flex-row mb-8 mx-8'>
                <div className='flex grow justify-end'>
                    <button className='inline-block font-medium bg-black text-white hover:bg-slate-800 py-1.5 px-6 mt-2 w-1/2' onClick={() => checkoutCart()}>Checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
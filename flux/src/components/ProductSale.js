import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const ProductSale = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // if(products.length === 0) {
                const response = await fetch(`http://localhost:3001/api/product/sale/true`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Data from API:', data);
                setProducts(data);
                // }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Could not fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Shoes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    if (!products || products.length === 0) {
        return <p>Products on sale not found</p>;
    }

    return (
        <motion.div
            className='flex flex-wrap justify-evenly my-4'
            animate={{
                x: ['-100%', '0%'],
                opacity: [0, 1]
            }}
            transition={{ duration: 0.5, ease: 'linear' }}
        >
            {products.map((product) => (
                <li key={product.productId} className='list-none'>
                    <Link to={`/api/product/${product.productId}`}>
                        <div className='flex-col m-4 w-[332px] h-[434px]'>
                            <div className='w-[332px] h-[330px] bg-[#efefef]'>
                                <img
                                    src={`/${product.img}`}
                                    alt='placeholder template'
                                    className='object-scale-down object-center w-[330px] h-[330px]'
                                />
                            </div>
                            <p className='text-base mt-4 font-light'>{product.title}</p>
                            <div className='flex flex-row'>
                                <p className='my-1 text-sm font-semibold'>${product.price}.00</p>
                                <p className='justify-end inline-block text-sm font-semibold bg-white text-black px-6 my-1'>SALE</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))
            }
        </motion.div>
    );
}

export default ProductSale;
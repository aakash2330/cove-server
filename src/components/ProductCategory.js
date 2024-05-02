import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../functions/loader';
import '../index.css';

const ProductCategory = () => {
    const apiUrl = process.env.API_URL;
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // if(products.length === 0) {
                const response = await fetch(`${apiUrl}/api/product/category/${category}`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                // console.log('Data from API:', data);
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
    }, [category]);

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    //Check if product is defined before accessing its properties
    if (!products || products.length === 0) {
        return <p>Product not found</p>;
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
                            <p className='my-1 text-sm font-semibold'>${product.price}.00</p>
                        </div>
                    </Link>
                </li>
            ))
            }
        </motion.div>
    );
}

export default ProductCategory;
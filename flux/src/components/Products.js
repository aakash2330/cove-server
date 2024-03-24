import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../index.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/home/home');
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Could not fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Shoes...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='flex flex-wrap border-solid border-2 border-orange-400 m-8'>
            {products.map((product) => (
                <li key={product.productId} className='list-none'>
                    <Link to={`/api/product/${product.productId}`}>
                    <div className='flex-col border-solid border-2 border-blue-400 m-8 w-[669px] h-[444px]'>
                        <img
                            src={product.img}
                            alt='placeholder template'
                            className='object-cover object-center max-w-full max-h-full border-solid border-2 border-red-400'
                        />
                        <p className='text-2xl mt-4'>{product.title}</p>
                        <p className='my-1'>${product.newPrice}</p>
                    </div>
                    </Link>
                </li>
            ))}
        </div>
    );
}

export default Products;
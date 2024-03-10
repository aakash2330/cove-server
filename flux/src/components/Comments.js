import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const Comments = () => {
    const { productId } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/comment/${productId}`);
                if (!response.ok) {
                    throw new Error(`Network response error: ${response.statusText}`);
                }
                const data = await response.json();
                console.log('Comment Data from API:', data); 
                setComments(data.comments);
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError('Could not fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Comments...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='flex flex-wrap border-solid border-2 border-orange-400 m-8'>
            {comments.map((comment) => (
                <li key={comment.productId} className='list-none'>
                    <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                        {/* <p className='text-2xl mt-4'>{comment.productId}</p> */}
                        {/* Will add username and convert date posted after user is added */}
                        <p className='my-1'>${comment.commentDescription}</p>
                    </div>
                </li>
            ))}
        </div>
    );
}

export default Comments;
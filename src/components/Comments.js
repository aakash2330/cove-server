import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const Comments = ({ isLoggedIn, username, url }) => {
    const { productId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    //Retrieving comments from the database
    const fetchData = async () => {
        try {
            const response = await fetch(`${url}/api/comment/${productId}`);
            if (!response.ok) {
                throw new Error(`Network response error: ${response.statusText}`);
            }
            const data = await response.json();
            // console.log('Comment Data from API:', data);
            setComments(data.comments);
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError('Could not fetch data');
        } 
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

    // Update state on input change
    const handleInputChange = (e) => {
        if (e.target.name === 'newComment') {
            setNewComment(e.target.value);
            // console.log('Adding comment now: ', newComment);
        }
    };
    // Handling the submission
    const createComment = async (e) => {
        e.preventDefault();
        //API request to post comment if logged in
        try {
            const response = await fetch(`${url}/api/comment/newComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    newComment,
                    productId,
                }),
            });

            if (response.ok) {
                // const responseData = await response.json();
                // console.log('Response Data: ', responseData);


                //Need to refresh the component
                fetchData(); //Grabbing the updated information from the db
                setNewComment('');

            } else {
                //Handle failed login
                const errorData = await response.json();
                console.error('Failed To set Comment', errorData.message);
            }
        } catch (error) {
            console.error('Error comment creation: ', error.message);
        }
    }


    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <div>
                <p className='ml-8'>Comments:</p>
            </div>
            {isLoggedIn ? (
                <div>
                <form onSubmit={createComment} method='POST' className='ml-8 mb-0 mt-8 max-w-md space-y-4'>
                    <div className='flex flex-row'>
                            <input
                                type='text'
                                id='newComment'
                                name='newComment'
                                value={newComment}
                                onChange={handleInputChange}
                                className='w-full border border-gray-500 p-4 pe-12 text-sm shadow-sm'
                                placeholder='Enter Comment'
                            />
                        <div>
                            <button className='inline-block font-medium text-sm border bg-black text-white hover:bg-slate-800 py-4 px-6 ml-2' onClick={handleInputChange}>Add Comment</button>
                        </div>
                    </div>
                </form>
                </div>
            ) : (
                <p className='ml-8'>Login to add a comment</p>
            )}
            <div className='flex flex-col m-8'>
                {comments.map((comment) => (
                    <li key={comment._id} className='list-none'>
                        <div class='relative grid grid-cols-1 gap-4 p-4 mb-8 border border-gray-600'>
                            <div class='relative flex gap-4'>
                                    <div class='flex flex-col w-full'>
                                        <div class='flex flex-row justify-between'>
                                            <p class='relative text-xl whitespace-nowrap truncate overflow-hidden'>{comment.username}</p>
                                        </div>
                                        <p class='text-gray-600 text-sm'>{comment.createdAt.slice(0,10)}</p>
                                    </div>
                            </div>
                            <p class='mt-4 text-base font-light text-gray-600'>{comment.commentDescription}</p>
                        </div>
                    </li>
                ))}
            </div>
        </>
    );
}

export default Comments;
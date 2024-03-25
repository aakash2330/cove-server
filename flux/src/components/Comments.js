import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const Comments = ({ isLoggedIn, username }) => {
    const { productId } = useParams();
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //Retrieving commments from the database
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

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array ensures the effect runs only once on mount

 // Update state on input change
 const handleInputChange = (e) => {
    if (e.target.name === 'newComment') {
        setNewComment(e.target.value);
        console.log("Adding comment now: ", newComment);
    } 
};
     // Handling the submission
     const createComment = async (e) => {
        e.preventDefault();
        //API request to post comment if logged in
        try {
           const response = await fetch('http://localhost:3001/api/comment/newComment', {
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
               const responseData = await response.json();
               console.log('Response Data: ', responseData);
               
               
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
   

    //Come back to this. Make this do something else when loading
    if (loading) {
        return <p>Loading Comments...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
        { isLoggedIn ? (
            
        <form onSubmit={createComment} method="POST" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                <div>
                    <label htmlFor="userComment" className="sr-only">Add A Comment</label>

                    <div className="relative">
                        <input
                            type="text"
                            id="newComment"
                            name="newComment"
                            value={newComment}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Enter Comment"
                        />
                    </div>
                </div>
                </form>
              
) : (
    <p>Login to add a comment</p>
) }
<div>
    <p>Comments:</p>
</div>
        <div className='flex flex-wrap border-solid border-2 border-orange-400 m-8'>
            {comments.map((comment) => (
                <li key={comment._id} className='list-none'>
                    <div className='flex-col border-solid border-2 border-blue-400 m-8 w-96 h-1/3'>
                        {/* <p className='text-2xl mt-4'>{comment.productId}</p> */}
                        <p>{comment.username}</p>
                        <p className='my-1'>{comment.commentDescription}</p>
                        <p>{comment.createdAt}</p>
                    </div>
                </li>
            ))}
        </div>
        </>
    );
}

export default Comments;
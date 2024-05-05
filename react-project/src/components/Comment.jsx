import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Comment = ({ comment, comments, setComments, userEmail, indexUpdateComment, setIndexUpdateComment }) => {
    const navigate = useNavigate();
    const [updateCommentContent, setUpdateCommentContent] = useState(
        {
            name: '',
            body: ''
        });

    const deleteComment = () => {
        navigate(`../comments`);
        setIndexUpdateComment(-1);
                setUpdateCommentContent({
                    name: '',
                    body: ''
                });
        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updateComment = comments.filter(c => c.id !== comment.id);
                setComments(updateComment);
            })
    };

    const UpdateComment = () => {
        if (updateCommentContent.name == '' && updateCommentContent.body == '') {
            setIndexUpdateComment(-1);
            navigate(`../comments`);
            setUpdateCommentContent({
                name: '',
                body: ''
            });
            return;
        }
        const updateCommentObject = {
            postId: comment.postId,
            id: comment.id,
            name: updateCommentContent.name == '' ? comment.name : updateCommentContent.name,
            email: comment.email,
            body: updateCommentContent.body == '' ? comment.body : updateCommentContent.body
        };
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCommentObject),
        };
        fetch(`http://localhost:3000/comments/${comment.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                const updateComment = comments.map(currentComment => comment.id == currentComment.id ? updateCommentObject : currentComment);
                setComments(updateComment);
                setIndexUpdateComment(-1);
                setUpdateCommentContent({
                    name: '',
                    body: ''
                });
            })
            navigate(`../comments`);
    };

    const handleChange = (field, value) => {
        setUpdateCommentContent(prevDetails => ({
            ...prevDetails,
            [field]: value
        }));
    };

    const handleCommentUpdate = () => {
        console.log(indexUpdateComment)
        if (indexUpdateComment == comment.id) {
            setIndexUpdateComment(-1);
            navigate(`../comments`);
        }
        else {
            setIndexUpdateComment(comment.id);
            navigate(`../comments/${comment.id}`);
        }
    };

    return (
        <div className='todo'>
            <div>
                <h3 className='inputComment'>{comment.id}. {comment.name}</h3>
                <span className='inputCommentBody'>{comment.body}</span>
                <h4 className='inputCommentName'>{comment.email}</h4>
            </div>
            {(userEmail === comment.email) && (
                <div>
                    <button onClick={() => deleteComment()}>🗑️</button>
                    <button onClick={() => handleCommentUpdate()}>✏️</button>
                    {(indexUpdateComment === comment.id) && (
                        <div>
                            <textarea type="text" value={updateCommentContent.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Enter name of comment" className='input' />
                            <textarea type="text" value={updateCommentContent.body} onChange={(e) => handleChange('body', e.target.value)} placeholder="Enter body of comment" className='input' />
                            <button onClick={() => UpdateComment()}>Update Comment</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Comment
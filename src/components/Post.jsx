import { useState, useEffect } from 'react';

function Post({ author, body }) {
    const storedDeletedState = localStorage.getItem(`post-${author}-deleted`) === 'true';
    const storedAuthor = localStorage.getItem(`post-${author}-author`) || author;
    const storedBody = localStorage.getItem(`post-${author}-body`) || body;

    const [isDeleted, setIsDeleted] = useState(storedDeletedState);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAuthor, setEditedAuthor] = useState(storedAuthor);
    const [editedBody, setEditedBody] = useState(storedBody);

    useEffect(() => {
        localStorage.setItem(`post-${author}-deleted`, isDeleted);
    }, [isDeleted, author]);

    useEffect(() => {
        localStorage.setItem(`post-${author}-author`, editedAuthor);
        localStorage.setItem(`post-${author}-body`, editedBody);
    }, [editedAuthor, editedBody, author]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            setIsDeleted(true);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedAuthor(storedAuthor);
        setEditedBody(storedBody);
        setIsEditing(false);
    };

    if (isDeleted) return null;

    return (
        <li className='post'>
            {isEditing ? (
                <>
                    <input
						class="text_author"
                        type='text'
                        value={editedAuthor}
                        onChange={(e) => setEditedAuthor(e.target.value)}
                    />
                    <textarea
						class="text_area"
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                    <button className='save_button' onClick={handleSave}>Save</button>
                    <button className='cancel_button' onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
				<button className='edit_button' onClick={handleEdit}>Edit</button>
				<button className='delete_button' onClick={handleDelete}>Delete</button>

                    <p className='author'>{editedAuthor}</p>
                    <p className='text'>{editedBody}</p>
                    
                </>
            )}
        </li>
    );
}

export default Post;

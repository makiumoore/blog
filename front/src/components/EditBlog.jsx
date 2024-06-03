// src/EditBlog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css'

const EditBlog = ({ blog, fetchBlogs, closeEdit }) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [imageUrl, setImageUrl] = useState(blog.image_url);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://127.0.0.1:8000/blogs/${blog.id}/edit/`, {
            title: title,
            content: content,
            image_url: imageUrl
        })
        .then(response => {
            console.log('Blog post updated:', response.data);
            fetchBlogs(); // Refresh the list of blogs after editing
            closeEdit();  // Close the edit form
        })
        .catch(error => {
            console.error('There was an error updating the blog!', error);
        });
    };

    return (
        <div>
            <h2>Edit Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Update Blog</button>
            </form>
            <button onClick={closeEdit}>Cancel</button>
        </div>
    );
}

export default EditBlog;

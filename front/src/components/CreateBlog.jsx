import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'

const CreateBlog = ({ fetchBlogs }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/blogs/create/', {
            title: title,
            description: description,
            ImageUrl: imageUrl
        })
        .then(response => {
            fetchBlogs(); // Refresh the list of blogs after creating a new one
            setTitle('');
            setDescription('');
            setImageUrl('');
        })
        .catch(error => {
            console.error('There was an error creating the blog!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title" 
                placeholder="Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
            />
            <input 
                type="text" 
                name="description" 
                placeholder="Description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required 
            />
            <input 
                type="text" 
                name="imageUrl" 
                placeholder="Image URL" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required 
            />
            <button type="submit">Create Blog</button>
        </form>
    );
};

export default CreateBlog;

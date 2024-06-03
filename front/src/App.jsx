import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [editingBlog, setEditingBlog] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        axios.get('http://127.0.0.1:8000/blogs/')
            .then(response => {
                setBlogs(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the blogs!', error);
            });
    };

    const createBlog = (title, description, imageUrl) => {
        axios.post('http://127.0.0.1:8000/blogs/create/', {
            title: title,
            description: description,
            ImageUrl: imageUrl
        })
        .then(response => {
            fetchBlogs(); // Refresh the list of blogs after creating a new one
        })
        .catch(error => {
            console.error('There was an error creating the blog!', error);
        });
    };

    const deleteBlog = (id) => {
        axios.delete(`http://127.0.0.1:8000/blogs/${id}/`)
            .then(response => {
                fetchBlogs(); // Refresh the list of blogs after deleting
            })
            .catch(error => {
                console.error('There was an error deleting the blog!', error);
            });
    };

    const updateBlog = (id, title, description, imageUrl) => {
        axios.put(`http://127.0.0.1:8000/blogs/${id}/edit/`, {
            title: title,
            description: description,
            ImageUrl: imageUrl
        })
        .then(response => {
            fetchBlogs(); // Refresh the list of blogs after updating
            setEditingBlog(null); // Exit editing mode
        })
        .catch(error => {
            console.error('There was an error updating the blog!', error);
        });
    };

    const startEditBlog = (blog) => {
        setEditingBlog(blog);
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const imageUrl = e.target.imageUrl.value;
        createBlog(title, description, imageUrl);
        e.target.reset();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const imageUrl = e.target.imageUrl.value;
        updateBlog(editingBlog.id, title, description, imageUrl);
    };

    return (
        <div className="App">
            <h1>Blog Posts</h1>
            {editingBlog ? (
                <form onSubmit={handleEditSubmit}>
                    <input type="text" name="title" defaultValue={editingBlog.title} required />
                    <input type="text" name="description" defaultValue={editingBlog.description} required />
                    <input type="text" name="imageUrl" defaultValue={editingBlog.ImageUrl} required />
                    <button type="submit">Update Blog</button>
                    <button onClick={() => setEditingBlog(null)}>Cancel</button>
                </form>
            ) : (
                <>
                    <form onSubmit={handleCreateSubmit}>
                        <input type="text" name="title" placeholder="Title" required />
                        <input type="text" name="description" placeholder="Description" required />
                        <input type="text" name="imageUrl" placeholder="Image URL" required />
                        <button type="submit">Create Blog</button>
                    </form>
                    <ul>
                        {blogs.map(blog => (
                            <li key={blog.id}>
                                <h2>{blog.title}</h2>
                                <p>{blog.description}</p>
                                <img src={blog.ImageUrl} alt={blog.title} />
                                <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                                <button onClick={() => startEditBlog(blog)}>Edit</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default App;

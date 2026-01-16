import React, { useState, useEffect } from 'react';
import { blogAPI } from './api';
import { useAuth } from './AuthContext';

const BlogList = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data.blogs);
    } catch (error) {
      setError('Failed to fetch blogs');
    }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h2>All Blogs</h2>
      
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div>
          {blogs.map((blog) => (
            <div key={blog._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                {blog.imageUrl && (
                  <img 
                    src={`http://localhost:3000${blog.imageUrl}`} 
                    alt={blog.title}
                    style={{ width: '150px', height: '100px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3>{blog.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    By: {blog.author.name} | {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  {blog.excerpt ? (
                    <p>{blog.excerpt}</p>
                  ) : (
                    <p>{blog.content.substring(0, 200)}...</p>
                  )}
                  
                  {blog.tags && blog.tags.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      {blog.tags.map((tag, index) => (
                        <span key={index} style={{ 
                          backgroundColor: '#e9ecef', 
                          padding: '2px 8px', 
                          marginRight: '5px', 
                          borderRadius: '3px',
                          fontSize: '12px'
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {user && (blog.author._id === user.id || user.role === 'admin') && (
                    <div style={{ marginTop: '10px' }}>
                      <button 
                        onClick={() => deleteBlog(blog._id)}
                        style={{ 
                          backgroundColor: '#dc3545', 
                          color: 'white', 
                          border: 'none', 
                          padding: '5px 10px',
                          cursor: 'pointer'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
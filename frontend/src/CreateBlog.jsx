import React, { useState } from 'react';
import { blogAPI } from './api';
import ImageUpload from './ImageUpload';

const CreateBlog = ({ onBlogCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    published: false,
    imageUrl: '',
    excerpt: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({
      ...formData,
      imageUrl: imageUrl
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      await blogAPI.createBlog(blogData);
      
      setFormData({
        title: '',
        content: '',
        tags: '',
        published: false,
        imageUrl: '',
        excerpt: ''
      });
      
      if (onBlogCreated) onBlogCreated();
      alert('Blog created successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create blog');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Create New Blog</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <textarea
            name="excerpt"
            placeholder="Brief excerpt (optional)"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>

        <ImageUpload onImageUpload={handleImageUpload} />
        
        {formData.imageUrl && (
          <div style={{ marginBottom: '15px' }}>
            <p>Image uploaded: {formData.imageUrl}</p>
          </div>
        )}
        
        <div style={{ marginBottom: '15px' }}>
          <textarea
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ marginRight: '8px' }}
            />
            Publish immediately
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#28a745', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
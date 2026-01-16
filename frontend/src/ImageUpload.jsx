import React, { useState } from 'react';
import { uploadAPI } from './api';

const ImageUpload = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await uploadAPI.uploadImage(formData);
      
      if (onImageUpload) {
        onImageUpload(response.data.imageUrl);
      }
      
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Failed to upload image');
      setPreview(null);
    }
    setUploading(false);
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        style={{ marginBottom: '10px' }}
      />
      
      {uploading && <div>Uploading...</div>}
      
      {preview && (
        <div>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
import React, { useState, useEffect } from 'react';
import { adminAPI, blogAPI } from './api';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await blogAPI.getAllBlogsAdmin();
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Failed to fetch blogs');
    }
    setLoading(false);
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This will also delete all their blogs.')) {
      try {
        await adminAPI.deleteUser(userId);
        setUsers(users.filter(u => u._id !== userId));
        fetchStats();
        alert('User deleted successfully');
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      setUsers(users.map(u => u._id === userId ? {...u, role: newRole} : u));
      alert('User role updated successfully');
    } catch (error) {
      alert('Failed to update user role');
    }
  };

  const deleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.deleteBlog(blogId);
        setBlogs(blogs.filter(b => b._id !== blogId));
        fetchStats();
        alert('Blog deleted successfully');
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  if (user?.role !== 'admin') {
    return <div>Access denied. Admin only.</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('stats')}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: activeTab === 'stats' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'stats' ? 'white' : 'black',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          Statistics
        </button>
        <button 
          onClick={() => { setActiveTab('users'); fetchUsers(); }}
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px',
            backgroundColor: activeTab === 'users' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'users' ? 'white' : 'black',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          Users
        </button>
        <button 
          onClick={() => { setActiveTab('blogs'); fetchAllBlogs(); }}
          style={{ 
            padding: '10px 20px',
            backgroundColor: activeTab === 'blogs' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'blogs' ? 'white' : 'black',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          All Blogs
        </button>
      </div>

      {activeTab === 'stats' && (
        <div>
          <h2>Statistics</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ border: '1px solid #ccc', padding: '20px', minWidth: '150px' }}>
              <h3>{stats.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', minWidth: '150px' }}>
              <h3>{stats.totalBlogs || 0}</h3>
              <p>Total Blogs</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', minWidth: '150px' }}>
              <h3>{stats.publishedBlogs || 0}</h3>
              <p>Published Blogs</p>
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', minWidth: '150px' }}>
              <h3>{stats.totalAdmins || 0}</h3>
              <p>Total Admins</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2>User Management</h2>
          {loading ? <div>Loading...</div> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Role</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Created</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{u.name}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{u.email}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      <select 
                        value={u.role} 
                        onChange={(e) => changeUserRole(u._id, e.target.value)}
                        disabled={u._id === user.id}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {u._id !== user.id && (
                        <button 
                          onClick={() => deleteUser(u._id)}
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
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'blogs' && (
        <div>
          <h2>Blog Management</h2>
          {loading ? <div>Loading...</div> : (
            <div>
              {blogs.map(blog => (
                <div key={blog._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px' }}>
                  <h3>{blog.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>
                    By: {blog.author.name} | Status: {blog.published ? 'Published' : 'Draft'} | 
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p>{blog.content.substring(0, 200)}...</p>
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
                    Delete Blog
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
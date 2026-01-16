import React, { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';
import BlogList from './BlogList';
import CreateBlog from './CreateBlog';
import AdminDashboard from './AdminDashboard';
import './App.css';

const AppContent = () => {
  const { user, logout, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [refreshBlogs, setRefreshBlogs] = useState(0);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        {showRegister ? (
          <Register onToggle={() => setShowRegister(false)} />
        ) : (
          <Login onToggle={() => setShowRegister(true)} />
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ 
        padding: '10px 20px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1>Blog App</h1>
        <div>
          <span style={{ marginRight: '15px' }}>
            Welcome, {user.name} ({user.role})
          </span>
          <button 
            onClick={() => {
              setShowCreateBlog(!showCreateBlog);
              setShowAdminDashboard(false);
            }}
            style={{ 
              marginRight: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {showCreateBlog ? 'View Blogs' : 'Create Blog'}
          </button>
          {user.role === 'admin' && (
            <button 
              onClick={() => {
                setShowAdminDashboard(!showAdminDashboard);
                setShowCreateBlog(false);
              }}
              style={{ 
                marginRight: '10px',
                padding: '5px 10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {showAdminDashboard ? 'Exit Admin' : 'Admin Dashboard'}
            </button>
          )}
          <button 
            onClick={logout}
            style={{ 
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div>
        {showAdminDashboard ? (
          <AdminDashboard />
        ) : showCreateBlog ? (
          <CreateBlog 
            onBlogCreated={() => {
              setRefreshBlogs(prev => prev + 1);
              setShowCreateBlog(false);
            }} 
          />
        ) : (
          <BlogList key={refreshBlogs} />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import Register from './Register';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';
import CreateBlog from './CreateBlog';
import AdminDashboard from './AdminDashboard';
import LandingPage from './LandingPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/blogs" replace />;
  }

  return children;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [refreshBlogs, setRefreshBlogs] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img src="/blog.png" alt="BlogApp" className="h-10 w-14 object-contain" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BlogApp</h1>
                <p className="text-sm text-gray-500">Welcome, {user.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {user.role}
              </span>
              
              <button
                onClick={() => {
                  setShowCreateBlog(!showCreateBlog);
                  setShowAdminDashboard(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                {showCreateBlog ? 'View Blogs' : 'Create Blog'}
              </button>
              
              {user.role === 'admin' && (
                <button
                  onClick={() => {
                    setShowAdminDashboard(!showAdminDashboard);
                    setShowCreateBlog(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                >
                  {showAdminDashboard ? 'Exit Admin' : 'Admin'}
                </button>
              )}
              
              <button
                onClick={logout}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
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
      </main>
    </div>
  );
};

const AuthPages = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      {showRegister ? (
        <Register onToggle={() => setShowRegister(false)} />
      ) : (
        <Login onToggle={() => setShowRegister(true)} />
      )}
    </div>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to="/blogs" replace />
          ) : (
            <LandingPage onGetStarted={() => navigate('/login')} />
          )
        } 
      />
      <Route path="/login" element={<PublicRoute><AuthPages /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register onToggle={() => window.location.href = '/login'} /></PublicRoute>} />
      <Route path="/blogs" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/blog/:id" element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { blogAPI } from '../api';
import { useAuth } from '../Auth/AuthContext';
import { Plus, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      const blogData = response.data.blogs || response.data;
      setBlogs(Array.isArray(blogData) ? blogData : []);
    } catch {
      setError('Failed to load blogs. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('Delete this post permanently?')) {
      try {
        await blogAPI.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch {
        alert('Could not delete the blog post.');
      }
    }
  };

  const SkeletonCard = () => (
    <div className="bg-white/[0.03] border border-white/[0.06] p-8 rounded-2xl animate-pulse">
      <div className="flex justify-between mb-6">
        <div className="h-3 w-20 bg-white/[0.06] rounded" />
        <div className="h-3 w-12 bg-white/[0.06] rounded" />
      </div>
      <div className="h-8 bg-white/[0.06] rounded w-3/4 mb-4" />
      <div className="h-4 bg-white/[0.06] rounded w-full mb-2" />
      <div className="h-4 bg-white/[0.06] rounded w-2/3 mb-8" />
      <div className="flex gap-2">
        <div className="h-6 w-12 bg-white/[0.04] rounded-full" />
        <div className="h-6 w-12 bg-white/[0.04] rounded-full" />
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 space-y-4">
          <div className="h-12 w-64 bg-white/[0.06] rounded-lg animate-pulse" />
          <div className="h-1 w-12 bg-indigo-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white pb-20">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-2">Archive</p>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              Latest <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Blogs</span>
            </h1>
            <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-violet-600 mt-4 rounded-full" />
          </div>
        </div>

        {error && (
          <div className="mb-10 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div className="py-40 text-center border border-dashed border-white/[0.1] rounded-3xl bg-white/[0.02]">
            <div className="inline-flex p-6 rounded-full bg-white/[0.04] mb-4">
              <Plus className="text-white/20 rotate-45" size={32} />
            </div>
            <p className="text-white/30 font-medium text-sm">No blog posts yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <article
                key={blog._id}
                onClick={() => navigate(`/blog/${blog._id}`)}
                className={`group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.15)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer overflow-hidden ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {blog.imageUrl && (
                  <div className="w-full h-48 md:h-56 overflow-hidden bg-white/[0.02]">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center">
                        <User size={10} className="text-white/30" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                        {blog.author?.name || 'Anonymous'}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-white/20">
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                    </span>
                  </div>

                  <h3 className={`font-bold text-white/90 leading-tight mb-3 group-hover:text-indigo-300 transition-colors ${
                    index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'
                  }`}>
                    {blog.title}
                  </h3>

                  <p className="text-white/40 leading-relaxed text-sm mb-6 line-clamp-3">
                    {blog.excerpt || (blog.content && blog.content.substring(0, 140) + '...')}
                  </p>
                </div>

                <div className="px-6 pb-6 flex items-center justify-between">
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold uppercase tracking-widest bg-white/[0.04] px-3 py-1.5 rounded-lg text-white/30 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-all duration-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {user && (blog.author?._id === user.id || user.role === 'admin') && (
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteBlog(blog._id); }}
                      className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      aria-label="Delete Blog"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
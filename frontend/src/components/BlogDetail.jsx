import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../api';
import { useAuth } from '../Auth/AuthContext';
import { ArrowLeft, User, Calendar, Trash2, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { fetchBlog(); }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogAPI.getBlog(id);
      setBlog(response.data.blog || response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog permanently?')) return;
    setDeleting(true);
    try {
      await blogAPI.deleteBlog(id);
      navigate('/blogs');
    } catch {
      setError('Failed to delete blog');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <Loader2 className="animate-spin text-indigo-400" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] px-4">
        <p className="text-red-400 text-lg font-semibold mb-4">{error}</p>
        <button
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 px-6 py-3 bg-white/[0.06] text-white rounded-xl hover:bg-white/[0.1] transition-colors"
        >
          <ArrowLeft size={18} /> Back to blogs
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <p className="text-white/40">Blog not found</p>
      </div>
    );
  }

  const isAuthor = user && (blog.author?._id === user.id || user.role === 'admin');

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <button
            onClick={() => navigate('/blogs')}
            className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to blogs</span>
          </button>
        </div>

        {blog.imageUrl && (
          <div className="w-full h-96 bg-white/[0.02] overflow-hidden">
            <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white/95 leading-tight mb-8">
              {blog.title}
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center">
                  <User size={18} className="text-white/40" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">{blog.author?.name || 'Anonymous'}</p>
                  <p className="text-xs text-white/30">{blog.author?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white/30">
                <Calendar size={18} />
                <span className="text-sm font-medium">
                  {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  }) : 'Draft'}
                </span>
              </div>

              {isAuthor && (
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="ml-auto flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50"
                >
                  <Trash2 size={18} />
                  <span className="text-sm font-semibold">{deleting ? 'Deleting...' : 'Delete'}</span>
                </button>
              )}
            </div>

            {blog.excerpt && (
              <p className="text-lg text-white/50 leading-relaxed font-medium italic">{blog.excerpt}</p>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              {blog.tags.map((tag, i) => (
                <span key={i} className="text-xs font-bold uppercase tracking-widest bg-white/[0.04] text-white/40 px-4 py-2 rounded-full hover:bg-indigo-500/20 hover:text-indigo-300 transition-all">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-lg prose-invert max-w-none mb-16">
            <div className="text-white/70 leading-relaxed space-y-4">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-4xl font-bold text-white/90 mt-8 mb-4" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white/90 mt-8 mb-4" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-2xl font-bold text-white/90 mt-6 mb-3" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-xl font-bold text-white/90 mt-6 mb-3" {...props} />,
                  p: ({ node, ...props }) => <p className="text-white/60 leading-relaxed mb-4" {...props} />,
                  a: ({ node, ...props }) => <a className="text-indigo-400 hover:text-indigo-300 underline transition-colors" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-bold text-white/80" {...props} />,
                  em: ({ node, ...props }) => <em className="italic text-white/60" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 my-4 text-white/60" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 my-4 text-white/60" {...props} />,
                  li: ({ node, ...props }) => <li className="ml-4" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-indigo-500/40 pl-6 py-4 my-4 text-white/50 italic bg-white/[0.02] rounded-r-lg" {...props} />,
                  code: ({ node, inline, ...props }) =>
                    inline
                      ? <code className="bg-white/[0.06] px-2 py-1 rounded font-mono text-sm text-indigo-300" {...props} />
                      : <code className="bg-[#111118] text-white/80 px-4 py-2 rounded block my-4 overflow-x-auto font-mono text-sm" {...props} />,
                  pre: ({ node, ...props }) => <pre className="bg-[#111118] text-white/80 px-6 py-4 rounded-xl overflow-x-auto my-4 border border-white/[0.06]" {...props} />,
                  img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-xl my-6" {...props} />,
                  hr: ({ node, ...props }) => <hr className="my-8 border-white/[0.06]" {...props} />,
                  table: ({ node, ...props }) => <table className="w-full border-collapse border border-white/[0.1] my-4" {...props} />,
                  th: ({ node, ...props }) => <th className="border border-white/[0.1] bg-white/[0.04] p-2 text-left font-bold text-white/70" {...props} />,
                  td: ({ node, ...props }) => <td className="border border-white/[0.1] p-2 text-white/50" {...props} />,
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </div>
          </div>

          <div className="pt-8 border-t border-white/[0.06]">
            <button
              onClick={() => navigate('/blogs')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] transition-all"
            >
              <ArrowLeft size={18} />
              <span className="font-semibold">Back to all blogs</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;

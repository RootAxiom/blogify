import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] py-20 px-4">
      <nav className="bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/[0.06] fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/blog.png" alt="Blogify" className="h-10 w-14 object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Blogify
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white/90 mb-4">Get in Touch</h1>
            <p className="text-lg text-white/40">
              We'd love to hear from you! Share your feedback, suggestions, or questions.
            </p>
          </div>

          <div className="bg-[#111118] rounded-2xl border border-white/[0.06] p-8 md:p-12">
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-sm font-medium">
                Thank you! We've received your message and will get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/60 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/60 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/60 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Feedback, suggestion, or question"
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/60 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/30 outline-none transition-all placeholder:text-white/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <p className="text-center text-white/40">
                Or email us directly at{' '}
                <a href="mailto:team-blogify@surajitsen.live" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  team-blogify@surajitsen.live
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

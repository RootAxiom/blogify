import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const Register = ({ onToggle }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
     <div className="min-h-screen min-w-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        
        {/* Header */}
        <div className="mb-10">
          <img src='/blog.png' alt="bloggify logo" srcset="" />
          <h1 className="text-4xl font-bold text-black tracking-tight mb-3">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Join us to start managing your workspace.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="your name"
              className="w-full px-0 py-2 bg-transparent border-b border-gray-200 text-black placeholder:text-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-0 py-2 bg-transparent border-b border-gray-200 text-black placeholder:text-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          {/* Password */}
                <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Password
                </label>
                <div className="relative">
                  <input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="**********"
                  className="w-full px-0 py-2 bg-transparent border-b border-gray-200 text-black placeholder:text-gray-300 focus:border-black focus:outline-none transition-colors"
                  />
                  <button
                  type="button"
                  onClick={() => setFormData({ ...formData, showPassword: !formData.showPassword })}
                  className="absolute right-0 top-0 text-white-400 hover:text-white-600 "
                  >
                  {formData.showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.897a3.375 3.375 0 001-2.121M3 3l3.6 3.6m0 0L21 21" />
                    </svg>
                  )}
                  </button>
                </div>
                </div>
                <button
                type="submit"
                disabled={loading}
                className="group relative w-full bg-black text-white font-bold py-4 rounded-full overflow-hidden transition-all hover:bg-gray-900 active:scale-[0.98] disabled:bg-gray-200 disabled:cursor-not-allowed mt-4"
                >
                <span className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                  Create Account
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                </button>
              </form>

              {/* Footer */}  
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button 
              onClick={onToggle} 
              className="text-black font-bold hover:text-red-600 hover:underline underline-offset-4 decoration-2"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
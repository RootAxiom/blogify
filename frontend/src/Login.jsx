import React,{ useState } from 'react';
import { useAuth } from './AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = ({ onToggle }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

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

    if (!recaptchaToken) {
      setError('Please verify the reCAPTCHA');
      setLoading(false);
      return;
    }

    const result = await login(formData);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="w-full max-w-md">           
          <div className="text-center mb-10">
              <img src="./blog.png" alt="bloggify logo" srcset="" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Welcome back</h1>
            <p className="text-gray-500 mt-3 text-base leading-relaxed">Sign in to your account to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slideIn">
              <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm font-medium flex-1">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2.5 group-focus-within:text-black transition-colors">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="verified@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0 focus:border-transparent transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400 hover:border-gray-400"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-2.5">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800 group-focus-within:text-black transition-colors">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-gray-600 hover:text-black hover:underline transition-all duration-200">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black focus:ring-offset-0 focus:border-transparent transition-all duration-200 outline-none text-gray-900 placeholder:text-gray-400 hover:border-gray-400"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <ReCAPTCHA 
                sitekey="6LfebVAsAAAAAP4BNWw8kJ-eEfhs9ZWsGG4eYSHn"
                onChange={setRecaptchaToken}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-black text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                onClick={onToggle} 
                className="font-semibold text-black hover:text-red-600 hover:underline transition-all duration-200 relative group"
              >
                Create an account
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </button>
            </p>
          </div>
        </div>       
    </div>
  );
};

export default Login;
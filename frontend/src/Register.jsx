import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import VerifyOTP from './VerifyOTP';
import ReCAPTCHA from 'react-google-recaptcha';

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
  const [verificationSent, setVerificationSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

    const result = await register(formData);
    if (!result.success) {
      setError(result.message);
    } else if (result.requiresVerification) {
      setVerificationSent(true);
      setRegisteredEmail(formData.email);
    }
    setLoading(false);
  };

  const handleOTPVerified = () => {
    // auto redirect to blogs page
    window.location.href = '/blogs';
  };

  
  if (verificationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <img src="/blog.png" alt="Blogify logo" className="h-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h1>
            <p className="text-gray-600 text-sm">
              We've sent a 6-digit code to your inbox
            </p>
          </div>

          <VerifyOTP 
            email={registeredEmail} 
            onVerified={handleOTPVerified}
          />

          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <button
              onClick={onToggle}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src='/blog.png' alt="blogify logo" className="h-30 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm">
            Sign up to start sharing your stories
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 text-sm font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-black transition-colors">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter you cool name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400 hover:border-gray-400"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-black transition-colors">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="verified@email.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400 hover:border-gray-400"
            />
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-gray-800 mb-2 group-focus-within:text-black transition-colors">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400 hover:border-gray-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
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

          <div className="mt-6 flex justify-center">
            <ReCAPTCHA 
              sitekey="6LfebVAsAAAAAP4BNWw8kJ-eEfhs9ZWsGG4eYSHn"
              onChange={setRecaptchaToken}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-700">
  <p className="font-medium">
    Due to a high number of spam accounts, registration currently requires email verification.
  </p>
  <p className="mt-1 font-normal text-gray-600">
    We promise we’ll never share your email with anyone.
  </p>
</div>

        <div className="mt-8 text-center border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onToggle}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

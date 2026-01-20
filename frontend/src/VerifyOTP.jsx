import React, { useState } from 'react';
import { authAPI } from './api';

const VerifyOTP = ({ email, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!otp || otp.length !== 6) {
        setError('OTP must be 6 digits');
        setLoading(false);
        return;
      }

      console.log('Verifying OTP:', otp, 'for email:', email);
      const response = await authAPI.verifyOTP({ email, otp });
      console.log('OTP verification response:', response.data);

      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setVerified(true);
      if (onVerified) {
        setTimeout(() => onVerified(), 1500);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'OTP verification failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (verified) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Email Verified!</h2>
        <p className="text-gray-600">Your email has been successfully verified.</p>
        <p className="text-sm text-gray-500">Redirecting to blogs...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleVerify} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Enter 6-digit OTP
        </label>
        <input
          type="text"
          maxLength="6"
          placeholder="000000"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setOtp(value);
          }}
          className="w-full px-4 py-4 border-2 border-gray-300 bg-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-center text-3xl font-bold text-gray-900 placeholder:text-gray-300 letter-spacing-2 transition-all outline-none"
          disabled={loading}
        />
        <p className="mt-3 text-sm text-gray-600 text-center">
          Verification code sent to <strong className="text-gray-900">{email}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || otp.length !== 6}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </div>
        ) : (
          'Verify OTP'
        )}
      </button>
    </form>
  );
};

export default VerifyOTP;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowLeft, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      // Error is handled in AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Back to Home */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20"
      >
        <ArrowLeft size={20} />
        <span>Back to Portfolio</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glass Card */}
        <div 
          className="backdrop-blur-xl rounded-3xl p-8 border shadow-2xl"
          style={{
            background: 'rgba(10, 9, 26, 0.8)',
            borderColor: 'rgba(168, 85, 247, 0.2)',
            boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.15)'
          }}
        >
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to access your admin panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 rounded-xl border"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(168, 85, 247, 0.2)'
                  }}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(168, 85, 247, 0.2)'
                  }}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Press <kbd className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">Ctrl + K</kbd> for command console
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-2xl opacity-20" />
      </motion.div>
    </div>
  );
};

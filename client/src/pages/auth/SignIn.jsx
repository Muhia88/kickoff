import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-md mx-auto mt-8 w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Sign in to Kickoff</h2>
        <p className="text-sm text-gray-600 mb-6">Enter your email and password to access your account.</p>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">Don't have an account? <Link to="/register" className="text-red-700 font-semibold">Create one</Link></p>
      </div>
    </div>
  );
};

export default SignIn;

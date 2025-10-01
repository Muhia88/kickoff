import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      // store token if returned
      if (data.access_token) localStorage.setItem('token', data.access_token);
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
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Create your account</h2>
        <p className="text-sm text-gray-600 mb-6">Sign up with your email and password.</p>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              type="text" 
              required 
              className="mt-1 block w-full border rounded px-3 py-2"
              placeholder="Choose a unique username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" required className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <button disabled={loading} type="submit" className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800">{loading ? 'Creating...' : 'Create account'}</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">Already have an account? <Link to="/signin" className="text-red-700 font-semibold">Sign in</Link></p>
      </div>
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/signin');

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(profile)
      });
      if (!res.ok) throw new Error('Failed to update profile');
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-playfair font-bold mb-4">My Profile</h1>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input value={profile.email} readOnly className="mt-1 w-full border rounded px-3 py-2 bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Full name</label>
            <input value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Phone</label>
            <input value={profile.phone || ''} onChange={e => setProfile({ ...profile, phone: e.target.value })} className="mt-1 w-full border rounded px-3 py-2" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white py-2 px-4 rounded">{saving ? 'Saving...' : 'Save changes'}</button>
            <button onClick={() => { localStorage.removeItem('token'); navigate('/signin'); }} className="text-sm text-gray-600 underline">Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

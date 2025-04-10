import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      alert('Please log in first!');
      window.location.href = '/login';
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);
  

  if (!user) return null;

  return (
    <div className="container">
      <h2>👤 Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
    </div>
  );
};

export default Profile;

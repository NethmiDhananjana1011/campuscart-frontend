import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Lock, User } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(response.data.message + " ✅");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed ❌");
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserPlus className="text-purple-600" size={32} />
          </div>
          <h2 className="text-2xl font-black text-gray-800">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join the CampusCart community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input name="username" type="text" placeholder="Username" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 border-none" required />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 border-none" required />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 border-none" required />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all active:scale-95">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
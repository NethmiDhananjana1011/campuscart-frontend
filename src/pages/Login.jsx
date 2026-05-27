import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend eke api hadapu login route ekata data yawana hati
      const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // Token eka saha user info browser eke mathaka thiyaganna save karanawa
      localStorage.setItem('campusUser', JSON.stringify(data)); 
      
      alert("Welcome back! Login Successful. ✅");
      window.location.href = "/"; // Home page ekata auto redirect wenawa
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Email or Password ❌");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
        <div className="text-center mb-10">
          <div className="bg-purple-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 rotate-3 group-hover:rotate-0 transition-transform">
            <LogIn className="text-purple-600" size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">Welcome Back</h2>
          <p className="text-gray-400 mt-2 font-medium">Log in to manage your CampusCart store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                name="email" 
                type="email" 
                placeholder="name@seu.ac.lk" 
                onChange={handleChange} 
                className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border-none transition-all" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                onChange={handleChange} 
                className="w-full pl-12 p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 border-none transition-all" 
                required 
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all active:scale-95 flex items-center justify-center gap-3">
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Don't have an account? 
            <Link to="/register" className="text-purple-600 font-bold ml-2 hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
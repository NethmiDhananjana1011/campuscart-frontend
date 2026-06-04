import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.user.name);
            navigate('/');
        } catch (err) {
            alert('Invalid credentials, access denied.');
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">Welcome Back</h2>
                    <p className="text-slate-400 text-sm mt-1">Sign in to manage your campus advertisements</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Campus Email Address</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@seu.ac.lk" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer">
                        Sign In Account
                    </button>
                </form>
                
                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register here</Link>
                </div>
            </div>
        </div>
    );
}
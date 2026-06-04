import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', campusId: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', formData);
            alert('Registration completed successfully! Please login.');
            navigate('/login');
        } catch (err) {
            alert('Registration error. Use unique campus email.');
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-16">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-slate-900">Student Sign Up</h2>
                    <p className="text-slate-400 text-sm mt-1">Join CampusCart marketplace network</p>
                </div>
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                        <input type="text" onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Campus Email</label>
                        <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="student@seu.ac.lk" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Student Registration No</label>
                        <input type="text" onChange={(e) => setFormData({...formData, campusId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="SEU/IS/XX/ICT/XXX" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Account Password</label>
                        <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer mt-2">
                        Create Student Account
                    </button>
                </form>
            </div>
        </div>
    );
}
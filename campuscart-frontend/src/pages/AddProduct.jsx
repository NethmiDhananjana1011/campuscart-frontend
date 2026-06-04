import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', image: '' });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login first to list items');
                return navigate('/login');
            }
            
            // Getting current user context safely 
            await axios.post('http://localhost:5000/api/products/add', formData);
            alert('Your item is now live in the marketplace!');
            navigate('/');
        } catch (err) {
            alert('Listing failed. Please check inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-xl shadow-slate-100/50">
                <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-slate-900">Create New Listing</h2>
                    <p className="text-sm text-slate-400 mt-1">Provide clear pictures and descriptions for fast sales.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Item Name</label>
                        <input type="text" onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Engineering Mathematics Textbook" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
                        <textarea rows="4" onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the item condition, usage details etc." required></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Price (LKR)</label>
                            <input type="number" onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rs." required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
                            <select onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select</option>
                                <option value="Books">Books / Notes</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Room Essentials">Room Essentials</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Product Image Link</label>
                        <input type="text" onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Paste image address URL" required />
                    </div>
                    
                    <button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer mt-4">
                        {submitting ? 'Publishing...' : 'Publish Advertisement'}
                    </button>
                </form>
            </div>
        </div>
    );
}
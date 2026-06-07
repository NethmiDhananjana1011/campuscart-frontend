import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageFile, setImageFile] = useState(null); // File එක තියාගන්න
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ළමයා ලොගින් වෙලා ඉන්න නිසා එයාගේ නම/ID එක ගන්නවා
        const userName = localStorage.getItem('userName') || 'Campus Student';

        // File එකක් යවන්න FormData Object එකක් හදන්න ඕනේ
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('seller', userName);
        
        // Image එකක් සිලෙක්ට් කරලා තියෙනවා නම් විතරක් ඒක එකතු කරනවා
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await axios.post('http://localhost:5000/api/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // File යවද්දී මේක අනිවාර්යයි
                }
            });
            alert('Advertisement Published Successfully!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to publish advertisement.');
        } finally {
            setLoading(false);
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
                        <input type="text" onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Calin Calculator" required />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Description</label>
                        <textarea rows="4" onChange={(e) => setDescription(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe the item condition..." required></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Price (LKR)</label>
                            <input type="number" onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Rs." required />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                <option value="">Select</option>
                                <option value="Books">Books / Notes</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Room Essentials">Room Essentials</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* මෙන්න මේ කොටස තමයි වැදගත්ම (File Upload එකක් හැදුවා) */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Upload Product Image</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])} 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                        />
                    </div>
                    
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-100 transition-all cursor-pointer mt-4">
                        {loading ? 'Publishing...' : 'Publish Advertisement'}
                    </button>
                </form>
            </div>
        </div>
    );
}
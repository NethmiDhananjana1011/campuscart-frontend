import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', image: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products/add', formData);
            alert('Product Listed Successfully!');
            navigate('/');
        } catch (err) {
            alert('Error adding product');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '500px' }}>
            <h2>Sell Something in Campus</h2>
            <form onSubmit={handleSubmit} className="card">
                <div className="form-group">
                    <label>Item Name</label>
                    <input type="text" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
                </div>
                <div className="form-group">
                    <label>Price (Rs.)</label>
                    <input type="number" onChange={(e) => setFormData({...formData, price: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input type="text" placeholder="Books, Electronics etc." onChange={(e) => setFormData({...formData, category: e.target.value})} required />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" placeholder="https://..." onChange={(e) => setFormData({...formData, image: e.target.value})} required />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Post Advertisement</button>
            </form>
        </div>
    );
}
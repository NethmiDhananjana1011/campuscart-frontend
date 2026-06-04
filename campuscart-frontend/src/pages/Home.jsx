import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 style={{ marginBottom: '1.5rem' }}>Campus Marketplace</h1>
            <div className="grid">
                {products.map(product => (
                    <div key={product._id} className="card">
                        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p style={{ color: '#4b5563', fontSize: '0.9rem' }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>Rs. {product.price}</span>
                            <button className="btn">View Contact</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredProducts = products.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Buy and Sell Everything Within <span className="text-blue-600">Campus</span>
                </h1>
                <p className="mt-4 text-lg text-slate-500">
                    The exclusive student-to-student marketplace. Get the best deals on books, electronics, notes, and essentials.
                </p>
                
                {/* Search Bar */}
                <div className="mt-8 max-w-xl mx-auto">
                    <input 
                        type="text" 
                        placeholder="Search for books, tech, room items..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Product Feed */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                    <p className="text-slate-400 text-lg">No listings found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group">
                            <div className="relative overflow-hidden bg-slate-100 h-48">
                                <img 
                                    src={product.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200/50">
                                    {product.category}
                                </span>
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                                    <p className="text-slate-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                                </div>
                                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-medium">Price</span>
                                        <span className="text-xl font-black text-slate-900">Rs. {product.price}</span>
                                    </div>
                                    <button 
                                        onClick={() => alert(`Contact Seller Info:\nName: ${product.seller?.name || 'Campus Student'}`)}
                                        className="bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold px-4 py-2 rounded-xl text-sm transition-all border border-slate-100"
                                    >
                                        Inspect
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // මේක අනිවාර්යයෙන් ඕනේ
import { ShoppingBag, PlusCircle, LayoutGrid, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: 'Books' });
  
  // Login වෙලා ඉන්න පරිශීලකයා ලබා ගැනීම
  const user = JSON.parse(localStorage.getItem('campusUser'));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (file) data.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Product Added Successfully! ✅");
      setFormData({ name: '', price: '', description: '', category: 'Books' });
      setFile(null);
      fetchProducts();
    } catch (err) {
      alert("Error adding product! ❌");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) { alert("Delete failed! ❌"); }
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      
      {/* LEFT SECTION: AUTH-PROTECTED FORM */}
      <div className="lg:col-span-1">
        {user ? (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <PlusCircle className="text-purple-600" size={20} /> List New Item
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
              <input type="number" name="price" placeholder="Price (LKR)" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500" required />
              
              <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500">
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Other">Other</option>
              </select>

              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-xs text-gray-500 file:bg-purple-50 file:text-purple-700 file:rounded-full file:border-0 file:px-4 file:py-1 cursor-pointer" />

              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 h-24"></textarea>
              
              <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all active:scale-95">
                Publish Product
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 h-fit sticky top-6 text-center shadow-inner">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
              <ShoppingBag className="text-purple-600" size={28} />
            </div>
            <h3 className="font-bold text-purple-900 mb-2">Ready to Sell?</h3>
            <p className="text-sm text-purple-600 mb-6">Log in to your account to list and manage your campus products.</p>
            <Link to="/login" className="block w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md">
              Login to Get Started
            </Link>
          </div>
        )}
      </div>

      {/* RIGHT SECTION: PRODUCT DISPLAY */}
      <div className="lg:col-span-2">
        {/* Search Bar Container */}
        <div className="mb-8 relative group">
          <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search by name or category (e.g. 'Books')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3.5 pl-12 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-gray-300"
          />
        </div>

        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
           <LayoutGrid size={20} className="text-purple-600" /> Campus Store Feed
        </h2>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard 
                key={p._id} 
                product={p} 
                onDelete={handleDelete} 
                isLoggedIn={!!user} // User ඉන්නවාද කියලා පරීක්ෂා කර යවයි
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <ShoppingBag className="mx-auto text-gray-200 mb-4" size={56} />
            <p className="text-gray-500 font-medium italic">No matches found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
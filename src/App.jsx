import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, PlusCircle, LayoutGrid } from 'lucide-react';

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Books'
  });

  // Backend connection and data fetch
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data));
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert("Product Added! ✅");
      setFormData({ name: '', price: '', description: '', category: 'Books' });
      fetchProducts();
    } catch (err) {
      alert("Error! ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Campus<span className="text-purple-600">Cart</span> Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Backend: <span className="text-green-600">{message}</span></p>
        </div>
        <div className="bg-white p-2 rounded-full shadow-sm border border-gray-200">
          <div className="bg-purple-100 p-2 rounded-full text-purple-600">
             <LayoutGrid size={20} />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM SECTION */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-purple-100 border border-purple-50">
          <div className="flex items-center gap-3 mb-6 text-purple-600">
            <PlusCircle size={24} />
            <h2 className="text-xl font-bold">List New Item</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Product Name</label>
              <input type="text" name="name" placeholder="E.g. Engineering Mathematics Book" value={formData.name} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Price (LKR)</label>
              <input type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none" required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full mt-1 p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-500 outline-none appearance-none">
                <option value="Books">Books 📚</option>
                <option value="Electronics">Electronics 💻</option>
                <option value="Fashion">Fashion 👕</option>
                <option value="Other">Other ✨</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 mt-4">
              Publish Product
            </button>
          </form>
        </div>

        {/* LIST SECTION */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Available Products ({products.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.length > 0 ? products.map((p, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
                <div className="bg-purple-50 p-4 rounded-xl text-purple-600">
                  <ShoppingBag size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{p.name}</h3>
                  <p className="text-xs font-medium text-gray-400 uppercase">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-purple-600 leading-none">Rs. {p.price}</p>
                </div>
              </div>
            )) : (
              <div className="col-span-2 text-center py-20 bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">No products listed yet. Start adding!</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
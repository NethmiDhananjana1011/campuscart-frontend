import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, PlusCircle, LayoutGrid, ShoppingCart, Trash2, Image as ImageIcon } from 'lucide-react';

/**
 * ProductCard Component 
 * Displays individual product details with a delete option
 */
const ProductCard = ({ product, onDelete }) => {
  // Construct the full image URL from the backend path
  const imageUrl = product.image ? `http://localhost:5000${product.image}` : null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-all">
      {/* Delete Button - Visible on hover */}
      <button 
        onClick={() => onDelete(product._id)}
        className="absolute top-2 right-2 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-100"
      >
        <Trash2 size={16} />
      </button>
      
      {/* Product Image Display */}
      <div className="h-48 bg-purple-50 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <ShoppingBag size={40} className="text-purple-200" />
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-gray-800">{product.name}</h3>
          <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            {product.category}
          </span>
        </div>
        <p className="text-gray-500 text-xs mb-3 line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-black text-purple-600">Rs. {product.price}</p>
          <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [file, setFile] = useState(null); // State for selected image file
  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: 'Books' });

  // Initial data fetch on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data))
      .catch(() => setMessage("Backend Offline ❌"));
    fetchProducts();
  }, []);

  /**
   * Fetches all products from the database
   */
  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Fetch Error:", err));
  };

  /**
   * Handles text input changes
   */
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles product submission with image using FormData
   */
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

  /**
   * Handles product deletion
   */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) { alert("Delete failed! ❌"); }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <header className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Campus<span className="text-purple-600">Cart</span>
        </h1>
        <p className="text-gray-400 text-sm italic mt-1">{message}</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Product Submission Form */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <PlusCircle className="text-purple-600" size={20} /> List New Item
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all" required />
            <input type="number" name="price" placeholder="Price (LKR)" value={formData.price} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all" required />
            
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all">
              <option value="Books">Books</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Other">Other</option>
            </select>

            {/* File selection for product image */}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <ImageIcon className="text-gray-400" size={20} />
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])} 
                className="text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
              />
            </div>

            <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 transition-all h-24"></textarea>
            
            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-100 active:scale-95">
              Publish Product
            </button>
          </form>
        </div>

        {/* Product Feed */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
             <LayoutGrid size={20} className="text-purple-600" /> Campus Store Feed
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} onDelete={handleDelete} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <ShoppingBag className="mx-auto text-gray-200 mb-4" size={48} />
              <p className="text-gray-400 font-medium">No products listed yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
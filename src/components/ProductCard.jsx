import React from 'react';
import { ShoppingCart, Tag, Trash2 } from 'lucide-react';

/**
 * ProductCard Component
 * Displays individual product details including images from the backend
 */
const ProductCard = ({ product, onDelete }) => {
  // Construct the full image URL pointing to our backend uploads folder
  const imageUrl = product.image 
    ? `http://localhost:5000${product.image}` 
    : 'https://via.placeholder.com/300';

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Tag size={14} className="text-purple-600" />
          <span className="text-xs font-bold text-gray-700">{product.category}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-purple-600 font-black text-xl mb-3">LKR {product.price}</p>
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{product.description}</p>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-900 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <ShoppingCart size={16} /> Buy Now
          </button>
          <button 
            onClick={() => onDelete(product._id)}
            className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
            title="Delete Product"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
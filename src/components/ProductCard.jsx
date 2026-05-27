import React from 'react';
import { ShoppingCart, Tag, Trash2 } from 'lucide-react';

/**
 * ProductCard Component
 * Renders a single product with image support from backend
 */
const ProductCard = ({ product, onDelete }) => {
  // Construct image URL from backend storage
  const imageUrl = product.image 
    ? `http://localhost:5000${product.image}` 
    : 'https://via.placeholder.com/300';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <div className="h-40 bg-gray-100 relative">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-purple-600 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm truncate">{product.name}</h3>
        <p className="text-purple-600 font-black text-lg">LKR {product.price}</p>
        
        <div className="mt-3 flex gap-2">
          <button className="flex-1 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <ShoppingCart size={14} /> Buy
          </button>
          <button 
            onClick={() => onDelete(product._id)}
            className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
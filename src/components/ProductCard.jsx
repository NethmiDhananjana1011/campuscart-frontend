import React from 'react';
import { ShoppingCart, Tag } from 'lucide-react';
import ProductCard from './components/ProductCard';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
        <ShoppingCart size={48} className="text-purple-200 group-hover:text-purple-300" />
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{product.name}</h3>
          <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 italic">
          {product.description || "No description available for this item."}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase">Price</p>
            <p className="text-xl font-black text-purple-600">Rs. {product.price}</p>
          </div>
          <button className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all active:scale-95">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
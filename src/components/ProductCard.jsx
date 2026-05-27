import React from 'react';
import { Trash2, Tag } from 'lucide-react';

// Props wala 'isLoggedIn' thiyෙනවාද කියලා බලන්න
const ProductCard = ({ product, onDelete, isLoggedIn }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={`http://localhost:5000/uploads/${product.image}`} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Tag size={12} className="text-purple-600" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">{product.category}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{product.name}</h3>
          <span className="text-purple-600 font-black text-lg">Rs.{product.price}</span>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <button className="text-sm font-bold text-purple-600 hover:text-purple-700 transition-colors">
            View Details
          </button>

          {/* මෙන්න මේ කොටස තමයි වැදගත්: Login වෙලා නම් විතරක් Delete පෙන්වනවා */}
          {isLoggedIn && (
            <button 
              onClick={() => onDelete(product._id)}
              className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
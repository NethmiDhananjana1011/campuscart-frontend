import React from 'react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 py-3 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-purple-600 p-2 rounded-lg shadow-lg shadow-purple-200">
          <ShoppingCart className="text-white" size={20} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">CampusCart</span>
      </div>

      <div className="hidden md:flex flex-1 mx-8 relative">
        <input 
          type="text" 
          placeholder="Search products..." 
          className="w-full bg-gray-100 border-none rounded-xl py-2 px-4 pl-11 focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm"
        />
        <Search className="absolute left-4 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex items-center gap-5 text-gray-600">
        <User className="hover:text-purple-600 cursor-pointer transition-colors" size={22} />
        <div className="relative hover:text-purple-600 cursor-pointer transition-colors">
          <ShoppingCart size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
        </div>
        <Menu className="md:hidden" size={22} />
      </div>
    </nav>
  );
};

export default Navbar;
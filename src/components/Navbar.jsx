import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  // Browser eke save wela thiyena user info gannawa
  const user = JSON.parse(localStorage.getItem('campusUser'));

  const handleLogout = () => {
    localStorage.removeItem('campusUser'); // Session eka delete karanawa
    navigate('/login');
    window.location.reload(); // Navbar eka refresh wenna
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-gray-900 flex items-center gap-2">
          <div className="bg-purple-600 p-1.5 rounded-lg text-white">
            <ShoppingBag size={20} />
          </div>
          Campus<span className="text-purple-600">Cart</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-bold text-gray-600">
          <Link to="/" className="hover:text-purple-600 transition-colors">Store Feed</Link>
          
          {user ? (
            // User login wela nam meka pennanawa
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full">
                <UserIcon size={16} />
                <span>{user.result.username}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            // User login wela nathi nam meka pennanawa
            <div className="flex items-center gap-4">
              <Link to="/register" className="hover:text-purple-600 transition-colors">Register</Link>
              <Link to="/login" className="bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-100">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
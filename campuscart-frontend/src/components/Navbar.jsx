import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tight text-blue-600">Campus<span className="text-slate-800">Cart</span></span>
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-100">SEUSL Edition</span>
                    </div>
                    
                    <div className="flex items-center gap-6 font-medium text-sm text-slate-600">
                        <Link to="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
                        {token ? (
                            <>
                                <Link to="/add" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow-sm shadow-blue-200 transition-all transform active:scale-95">
                                    + Sell Item
                                </Link>
                                <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold border border-slate-200">
                                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <button onClick={handleLogout} className="text-red-500 hover:text-red-600 font-semibold cursor-pointer">
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="hover:text-blue-600 transition-colors">Sign In</Link>
                                <Link to="/register" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-semibold transition-all">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
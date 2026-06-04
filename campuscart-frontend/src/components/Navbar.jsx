import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <h2>CampusCart</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/add">Sell Item</Link>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Welcome Back!');
            navigate('/');
        } catch (err) {
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '400px' }}>
            <h2>Student Login</h2>
            <form onSubmit={handleLogin} className="card">
                <div className="form-group">
                    <label>Campus Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
            </form>
        </div>
    );
}
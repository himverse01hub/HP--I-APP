import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShieldAlert } from 'lucide-react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const params = new URLSearchParams();
            params.append('username', username.trim());
            params.append('password', password.trim());

            const res = await axios.post('http://localhost:8000/api/auth/login', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            const userRes = await axios.get('http://localhost:8000/api/auth/me', {
                headers: { Authorization: `Bearer ${res.data.access_token}` }
            });

            login(res.data.access_token, userRes.data);
            navigate('/dashboard');
        } catch (err) {
            setError(
                axios.isAxiosError(err) && typeof err.response?.data?.detail === 'string'
                    ? err.response.data.detail
                    : 'Unable to connect to the authentication service'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />

            <div className="glass-card w-full max-w-md p-8 relative z-10 flex flex-col pt-10">
                <div className="flex justify-center mb-6">
                    <div className="bg-primary/20 p-4 rounded-full">
                        <ShieldAlert className="w-12 h-12 text-primary" />
                    </div>
                </div>
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-white">HP-OI Platform</h1>
                    <p className="text-sm text-zinc-400 mt-2">Haryana Police OSINT Intelligence</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md mb-6">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full bg-zinc-900/50 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                        Secure Login
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-zinc-800 pt-6">
                    <p className="text-xs text-zinc-500">Authorized personnel only. All access is logged and monitored.</p>
                </div>
            </div>
        </div>
    );
}

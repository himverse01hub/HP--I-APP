
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
    LayoutDashboard, FolderKanban, Users, ShieldAlert,
    Search, Bell, Settings, LogOut
} from 'lucide-react';

export default function MainLayout() {
    const { user, logout } = useAuthStore();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Investigations', path: '/cases', icon: FolderKanban },
        { name: 'Person Intel', path: '/persons', icon: Users },
        { name: 'Threat Intel', path: '/threat-intelligence', icon: ShieldAlert },
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-foreground flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-[#09090b] flex flex-col shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <ShieldAlert className="w-6 h-6 text-primary mr-3" />
                    <span className="font-bold tracking-wider text-sm">HP<span className="text-primary">-OI</span> PLATFORM</span>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-semibold text-zinc-500 mb-4 px-2 tracking-wider">COMMAND CENTER</div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'}`}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-border">
                    <button onClick={logout} className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Topbar */}
                <header className="h-16 border-b border-border bg-[#09090b]/80 backdrop-blur top-0 z-10 flex items-center justify-between px-6 shrink-0">
                    <div className="flex-1 flex max-w-2xl">
                        <div className="relative w-full">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                placeholder="Global Intelligence Search (Ctrl+K)"
                                className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all placeholder:text-zinc-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 ml-6">
                        <button className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-all relative">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#09090b]"></span>
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-all">
                            <Settings className="w-4 h-4" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 text-primary font-medium text-xs ml-2">
                            {user?.username?.charAt(0).toUpperCase() || 'INV'}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 relative">
                    {/* Subtle background glow */}
                    <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
                    <Outlet />
                </div>
            </main>
        </div>
    );
}


import {
    AlertTriangle, FolderOpen, Users, ShieldAlert,
    Activity, Clock, FileText, SearchCode
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { name: 'Active Investigations', value: '42', icon: FolderOpen, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { name: 'High Priority Alerts', value: '7', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
        { name: 'Persons of Interest', value: '128', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { name: 'Cyber Threats', value: '15', icon: ShieldAlert, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    ];

    const recentActivity = [
        { id: 1, type: 'search', user: 'INV-402', action: 'Global Search:', target: 'RAHUL KUMAR', time: '10 min ago' },
        { id: 2, type: 'alert', user: 'SYSTEM', action: 'High Confidence Match:', target: 'Vehicle HR-26-XX', time: '45 min ago' },
        { id: 3, type: 'case', user: 'INV-109', action: 'Case Updated:', target: 'FIR/2026/09', time: '2 hrs ago' },
        { id: 4, type: 'intel', user: 'AI-COPILOT', action: 'Report Generated:', target: 'Cyber Threat Analysis', time: '3 hrs ago' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Command Center</h1>
                    <p className="text-zinc-400 text-sm mt-1">Overview of intelligence and ongoing investigations</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="glass-card p-5 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform ${stat.color}`}>
                            <stat.icon className="w-24 h-24" />
                        </div>
                        <div className="flex items-start justify-between relative z-10">
                            <div>
                                <p className="text-zinc-400 text-sm font-medium mb-1">{stat.name}</p>
                                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="glass-card lg:col-span-2 flex flex-col">
                    <div className="p-5 border-b border-border/50 flex items-center justify-between">
                        <h3 className="font-semibold text-white flex items-center">
                            <Activity className="w-4 h-4 mr-2 text-primary" /> Intelligence Activity
                        </h3>
                        <button className="text-xs text-primary hover:text-primary/80 transition-colors">View All</button>
                    </div>
                    <div className="p-5 flex-1 space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-zinc-900/40 transition-colors">
                                <div className="mt-0.5">
                                    {activity.type === 'search' && <SearchCode className="w-4 h-4 text-zinc-400" />}
                                    {activity.type === 'alert' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                                    {activity.type === 'case' && <FolderOpen className="w-4 h-4 text-blue-400" />}
                                    {activity.type === 'intel' && <FileText className="w-4 h-4 text-primary" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-zinc-300">
                                        <span className="font-medium text-white">{activity.user}</span> {activity.action} <span className="text-primary">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1 flex items-center">
                                        <Clock className="w-3 h-3 mr-1" /> {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Targets */}
                <div className="glass-card flex flex-col">
                    <div className="p-5 border-b border-border/50">
                        <h3 className="font-semibold text-white flex items-center">
                            <Users className="w-4 h-4 mr-2 text-primary" /> Priority Targets
                        </h3>
                    </div>
                    <div className="p-5 flex-1 space-y-0 text-sm">
                        <p className="text-zinc-500 italic text-center py-8">Widget placeholder: Linked targets will appear here</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

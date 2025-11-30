import React from 'react';
import { Users, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', conversations: 40 },
  { name: 'Tue', conversations: 30 },
  { name: 'Wed', conversations: 20 },
  { name: 'Thu', conversations: 27 },
  { name: 'Fri', conversations: 18 },
  { name: 'Sat', conversations: 23 },
  { name: 'Sun', conversations: 34 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Conversations" 
          value="1,234" 
          change="+12%" 
          icon={MessageSquare} 
          color="blue"
        />
        <StatCard 
          title="Users Engaged" 
          value="845" 
          change="+5.2%" 
          icon={Users} 
          color="indigo"
        />
        <StatCard 
          title="Avg. Response Time" 
          value="1.2s" 
          change="-15%" 
          icon={Clock} 
          color="green"
        />
        <StatCard 
          title="Satisfaction Rate" 
          value="98%" 
          change="+2%" 
          icon={TrendingUp} 
          color="purple"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Conversation Volume (Last 7 Days)</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" strokeOpacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
              />
              <Area type="monotone" dataKey="conversations" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorConv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
           <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Recent Activity</h3>
           <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0">U{i}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">New conversation started regarding pricing</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">2 minutes ago</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-200">
           <h3 className="font-semibold text-slate-800 dark:text-white mb-4">System Status</h3>
           <div className="space-y-4">
             <div className="flex justify-between items-center">
               <span className="text-sm text-slate-600 dark:text-slate-400">Gemini 2.5 API Status</span>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">Operational</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm text-slate-600 dark:text-slate-400">Vector DB Latency</span>
               <span className="text-sm font-medium text-slate-900 dark:text-white">45ms</span>
             </div>
             <div className="flex justify-between items-center">
               <span className="text-sm text-slate-600 dark:text-slate-400">Monthly Message Quota</span>
               <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<any> = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20`}>
          <Icon className={`h-6 w-6 text-${color}-500 dark:text-${color}-400`} />
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
    </div>
  );
}

export default Dashboard;
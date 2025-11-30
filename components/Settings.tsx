import React, { useState } from 'react';
import { User, Bell, Shield, Mail, Building, CreditCard, Plus, Trash2, Check, Lock, Key, Eye, EyeOff, FileText, Smartphone } from 'lucide-react';

interface SettingsProps {
  apiKey?: string;
  setApiKey?: (key: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ apiKey = '', setApiKey }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveApiKey = () => {
    if (setApiKey) {
      setApiKey(tempApiKey);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-200">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800 p-4">
             <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">Settings</h2>
             <nav className="space-y-1">
               <button onClick={() => setActiveTab('account')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'account' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                 <User className="h-4 w-4" />
                 <span>Account Profile</span>
               </button>
               <button onClick={() => setActiveTab('team')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'team' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                 <Building className="h-4 w-4" />
                 <span>Team Members</span>
               </button>
               <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                 <Bell className="h-4 w-4" />
                 <span>Notifications</span>
               </button>
               <button onClick={() => setActiveTab('billing')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'billing' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                 <CreditCard className="h-4 w-4" />
                 <span>Billing & Plan</span>
               </button>
               <button onClick={() => setActiveTab('security')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                 <Shield className="h-4 w-4" />
                 <span>Security</span>
               </button>
             </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8 bg-white dark:bg-slate-900">
             {activeTab === 'account' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                   <h3 className="text-lg font-medium text-slate-900 dark:text-white">Profile Information</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Update your account's profile information and email address.</p>
                 </div>
                 <div className="grid grid-cols-1 gap-6 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                      <input type="text" defaultValue="John Smith" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                      <input type="email" defaultValue="john.smith@example.com" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                      <input type="text" defaultValue="Acme Corp" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-colors" />
                    </div>
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
                    </div>
                 </div>
               </div>
             )}

             {activeTab === 'notifications' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                 <div>
                   <h3 className="text-lg font-medium text-slate-900 dark:text-white">Notification Preferences</h3>
                   <p className="text-sm text-slate-500 dark:text-slate-400">Choose what you want to be notified about.</p>
                 </div>
                 <div className="space-y-4">
                    {['Email me when a user starts a conversation', 'Email me weekly analytics reports', 'Notify me about product updates'].map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id={`notify-${idx}`} type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor={`notify-${idx}`} className="font-medium text-slate-700 dark:text-slate-300">{item}</label>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Preferences</button>
                    </div>
                 </div>
               </div>
             )}

             {activeTab === 'team' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Team Management</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage who has access to your bot configuration.</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-850 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                     <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Current Members</h4>
                        <button className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400">
                           <Plus className="h-3 w-3" /> Invite Member
                        </button>
                     </div>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded shadow-sm">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 text-xs font-bold">JS</div>
                              <div>
                                 <p className="text-sm font-medium text-slate-900 dark:text-white">John Smith (You)</p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">Owner</p>
                              </div>
                           </div>
                           <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">Active</span>
                        </div>
                        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-3 rounded shadow-sm">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300 text-xs font-bold">AL</div>
                              <div>
                                 <p className="text-sm font-medium text-slate-900 dark:text-white">Ada Lovelace</p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
                              </div>
                           </div>
                           <button className="text-slate-400 hover:text-red-500 transition-colors">
                              <Trash2 className="h-4 w-4" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
             )}

             {activeTab === 'billing' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Billing & Plan</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your subscription and payment methods.</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                     <div className="flex justify-between items-start">
                        <div>
                           <p className="text-blue-100 text-sm font-medium mb-1">Current Plan</p>
                           <h4 className="text-2xl font-bold">Business Plan</h4>
                           <p className="text-blue-100 text-sm mt-2 opacity-90">$149/month • Renews on Oct 24, 2024</p>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">Active</span>
                     </div>
                     <div className="mt-6 pt-6 border-t border-white/20 flex gap-4">
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">Upgrade Plan</button>
                        <button className="text-white/90 hover:text-white text-sm font-medium px-2">Cancel Subscription</button>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-850">
                       <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Payment Method</h4>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="bg-white dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                                <CreditCard className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                             </div>
                             <div>
                                <p className="text-sm font-medium text-slate-900 dark:text-white">Visa ending in 4242</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Expiry 12/25</p>
                             </div>
                          </div>
                          <button className="text-sm text-blue-600 hover:underline dark:text-blue-400">Edit</button>
                       </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-850">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Invoice History</h4>
                        <div className="space-y-2">
                           {[
                              { date: 'Oct 24, 2024', amount: '$149.00', status: 'Paid' },
                              { date: 'Sep 24, 2024', amount: '$149.00', status: 'Paid' },
                              { date: 'Aug 24, 2024', amount: '$149.00', status: 'Paid' }
                           ].map((inv, i) => (
                             <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">
                                <div className="flex items-center gap-3">
                                   <FileText className="h-4 w-4 text-slate-400" />
                                   <span className="text-slate-700 dark:text-slate-300">{inv.date}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                   <span className="text-slate-600 dark:text-slate-400">{inv.amount}</span>
                                   <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">{inv.status}</span>
                                </div>
                             </div>
                           ))}
                        </div>
                    </div>
                  </div>
               </div>
             )}

             {activeTab === 'security' && (
               <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">Security</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your password and authentication keys.</p>
                  </div>

                  <div className="space-y-6">
                     {/* Gemini API Key Section */}
                     <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                       <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                         <Key className="h-4 w-4 text-blue-500" />
                         Gemini API Key
                       </h4>
                       <div className="space-y-3 max-w-lg">
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Required to power the chatbot. This key is stored locally in your browser for this demo.
                          </p>
                          <div className="relative">
                            <input 
                              type={showApiKey ? "text" : "password"} 
                              value={tempApiKey}
                              onChange={(e) => setTempApiKey(e.target.value)}
                              placeholder="AIzaSy..."
                              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-white" 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                          <div className="flex gap-3">
                             <button 
                                onClick={handleSaveApiKey}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                             >
                               <Check className="h-4 w-4" />
                               {isSaved ? "Saved!" : "Update Key"}
                             </button>
                             <a 
                               href="https://aistudio.google.com/app/apikey" 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center py-2"
                             >
                               Get Key
                             </a>
                          </div>
                       </div>
                     </div>

                     <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Change Password</h4>
                        <div className="grid grid-cols-1 gap-3 max-w-sm">
                           <input type="password" placeholder="Current Password" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-white" />
                           <input type="password" placeholder="New Password" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:text-white" />
                           <button className="w-full bg-slate-900 dark:bg-slate-700 text-white py-2 rounded-lg text-sm hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">Update Password</button>
                        </div>
                     </div>

                     <div>
                        <div className="flex items-center justify-between mb-4">
                           <div>
                              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
                           </div>
                           <div className="relative inline-block w-10 mr-2 align-middle select-none">
                              <input type="checkbox" name="toggle" id="2fa-toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-green-500" />
                              <label htmlFor="2fa-toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 cursor-pointer"></label>
                           </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-850 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                           <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Recent Login Activity</h4>
                           <div className="space-y-3">
                              <div className="flex justify-between items-center text-sm">
                                 <div className="flex items-center gap-3">
                                    <Smartphone className="h-4 w-4 text-slate-400" />
                                    <div>
                                       <p className="text-slate-900 dark:text-white font-medium">Chrome on Mac OS X</p>
                                       <p className="text-xs text-slate-500 dark:text-slate-400">San Francisco, CA • Current Session</p>
                                    </div>
                                 </div>
                                 <span className="text-xs text-green-600 dark:text-green-400">Active now</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
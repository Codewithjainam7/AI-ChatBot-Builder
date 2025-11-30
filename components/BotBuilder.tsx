import React, { useState, useEffect, useRef } from 'react';
import { BotConfig, Message } from '../types';
import { generateBotResponse } from '../services/geminiService';
import { Save, RefreshCw, Send, Trash2, Upload, MessageCircle, FileText, AlertCircle, Loader2, CheckCircle, Bot, Sparkles, LayoutTemplate, Palette, Type, AlignLeft, AlignRight, File } from 'lucide-react';

interface BotBuilderProps {
  apiKey: string;
}

interface UploadedFile {
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'complete' | 'error';
  progress: number;
}

const PRESET_COLORS = [
  '#2563eb', // Blue
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#ea580c', // Orange
  '#16a34a', // Green
  '#0f172a', // Slate
];

const FONTS = [
  { name: 'Inter (Default)', value: 'font-sans' },
  { name: 'Serif (Elegant)', value: 'font-serif' },
  { name: 'Mono (Technical)', value: 'font-mono' },
];

const BotBuilder: React.FC<BotBuilderProps> = ({ apiKey }) => {
  // State for the bot configuration
  const [config, setConfig] = useState<BotConfig>({
    id: '1',
    name: 'Support Bot',
    avatarUrl: 'https://picsum.photos/200/200',
    primaryColor: '#2563eb', // blue-600
    welcomeMessage: 'Hello! How can I help you with our products today?',
    systemInstruction: 'You are a helpful, professional customer support agent for a SaaS company.',
    knowledgeBase: 'We sell a CRM tool called SalesFlow. Pricing is $29/mo for Starter, $99/mo for Pro. We offer 24/7 support. Our office is located in San Francisco.',
    isActive: true,
    position: 'bottom-right',
    launcherIcon: 'message-circle',
    fontFamily: 'font-sans',
  });

  // State for the preview chat
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'model', content: config.welcomeMessage, timestamp: Date.now() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'knowledge' | 'appearance'>('settings');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update welcome message in chat when config changes
  useEffect(() => {
    setMessages(prev => {
        if (prev.length > 0 && prev[0].id === '0') {
            return [{ ...prev[0], content: config.welcomeMessage }, ...prev.slice(1)];
        }
        return prev;
    });
  }, [config.welcomeMessage]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    if (!apiKey) {
        const msg: Message = {
            id: Date.now().toString(),
            role: 'model',
            content: "Please set your Gemini API Key in Settings to enable the chatbot.",
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, {
            id: (Date.now() - 1).toString(),
            role: 'user',
            content: inputText,
            timestamp: Date.now()
        }, msg]);
        setInputText('');
        return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate network delay for realism if it's too fast
      const responseText = await generateBotResponse(
        apiKey,
        [...messages, userMsg],
        config.systemInstruction,
        config.knowledgeBase
      );

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ id: '0', role: 'model', content: config.welcomeMessage, timestamp: Date.now() }]);
  };

  const handleFileUpload = () => {
     // Generate a fake file
     const fakeFiles = [
        { name: "product_manual_v2.pdf", type: "PDF", size: "2.4 MB" },
        { name: "pricing_2024.docx", type: "DOCX", size: "1.1 MB" },
        { name: "support_policy.txt", type: "TXT", size: "15 KB" },
        { name: "knowledge_dump.csv", type: "CSV", size: "450 KB" }
     ];
     
     // Find one not already uploaded
     const existingNames = uploadedFiles.map(f => f.name);
     const available = fakeFiles.filter(f => !existingNames.includes(f.name));
     const nextFileBase = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : fakeFiles[0];
     const nextFileName = available.length > 0 ? nextFileBase.name : `copy_${Date.now()}_${nextFileBase.name}`;

     const newFile: UploadedFile = {
         ...nextFileBase,
         name: nextFileName,
         status: 'uploading',
         progress: 0
     };

     setUploadedFiles(prev => [...prev, newFile]);

     // Simulate progress
     let progress = 0;
     const interval = setInterval(() => {
         progress += Math.random() * 30;
         if (progress >= 100) {
             progress = 100;
             clearInterval(interval);
             setUploadedFiles(prev => prev.map(f => 
                 f.name === newFile.name ? { ...f, status: 'complete', progress: 100 } : f
             ));
         } else {
             setUploadedFiles(prev => prev.map(f => 
                 f.name === newFile.name ? { ...f, progress } : f
             ));
         }
     }, 300);
  };

  const handleSaveConfig = () => {
      if (!config.name.trim()) {
          setSaveStatus('error');
          setErrorMsg("Bot name is required.");
          setTimeout(() => setSaveStatus('idle'), 3000);
          return;
      }

      setSaveStatus('saving');
      // Simulate API call
      setTimeout(() => {
          setSaveStatus('saved');
          setTimeout(() => setSaveStatus('idle'), 2000);
      }, 800);
  };

  const renderLauncherIcon = () => {
      switch(config.launcherIcon) {
          case 'bot': return <Bot className="h-6 w-6 text-white" />;
          case 'sparkles': return <Sparkles className="h-6 w-6 text-white" />;
          default: return <MessageCircle className="h-6 w-6 text-white" />;
      }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6">
      
      {/* Left Column: Configuration */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors duration-200">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            General Settings
          </button>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'knowledge' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Knowledge Base
          </button>
          <button 
            onClick={() => setActiveTab('appearance')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'appearance' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Appearance
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'settings' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bot Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={config.name} 
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">System Instructions (Persona)</label>
                <textarea 
                  value={config.systemInstruction} 
                  onChange={(e) => setConfig({...config, systemInstruction: e.target.value})}
                  rows={4}
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                  placeholder="E.g. You are a helpful assistant..."
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Define how the AI should behave and its tone of voice.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Welcome Message</label>
                <input 
                  type="text" 
                  value={config.welcomeMessage} 
                  onChange={(e) => setConfig({...config, welcomeMessage: e.target.value})}
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                 <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Training Data
                 </h4>
                 <p className="text-xs text-blue-800 dark:text-blue-400 mt-1">
                   Upload PDF documents, text files, or scrape URLs to train your chatbot.
                 </p>
               </div>

               {/* File Upload Area */}
               <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload Sources</label>
                  <div 
                    onClick={handleFileUpload}
                    className={`
                      relative group border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ease-in-out
                      border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 hover:from-blue-50 hover:to-white dark:hover:from-slate-800 dark:hover:to-slate-800
                    `}
                  >
                    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-800 opacity-50 pointer-events-none rounded-xl" />
                    <div className="flex flex-col items-center z-10 space-y-3 relative">
                      <div className="h-14 w-14 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-110 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-all duration-300 group-hover:shadow-md">
                          <Upload className="h-7 w-7 text-slate-400 group-hover:text-blue-500 dark:text-slate-500 dark:group-hover:text-blue-400 transition-colors" />
                      </div>
                      <div>
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              Click to upload documents
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                              Supports PDF, TXT, DOCX, CSV (Max 10MB)
                          </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-3">
                       {uploadedFiles.map((file, idx) => (
                         <div key={idx} className="group relative flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center gap-3 overflow-hidden flex-1">
                               <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                                   {file.type === 'PDF' ? <FileText className="h-5 w-5 text-red-500" /> : <File className="h-5 w-5 text-blue-500" />}
                               </div>
                               <div className="min-w-0 flex-1">
                                   <div className="flex justify-between items-center mb-1">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{file.name}</p>
                                      {file.status === 'uploading' && (
                                          <span className="text-[10px] text-blue-600 font-medium">{Math.round(file.progress)}%</span>
                                      )}
                                   </div>
                                   {file.status === 'uploading' ? (
                                     <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                       <div 
                                         className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full" 
                                         style={{ width: `${file.progress}%` }}
                                       />
                                     </div>
                                   ) : (
                                     <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase bg-slate-100 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">{file.type}</span>
                                        <span className="text-[10px] text-slate-400">• {file.size}</span>
                                     </div>
                                   )}
                               </div>
                            </div>
                            
                            <div className="flex items-center gap-2 pl-3">
                                {file.status === 'complete' && (
                                  <div className="flex items-center text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full animate-in fade-in zoom-in duration-300">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Ready
                                  </div>
                                )}
                                {file.status !== 'uploading' && (
                                  <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setUploadedFiles(uploadedFiles.filter(f => f.name !== file.name));
                                    }}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Remove file"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                )}
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Text Context / FAQs</label>
                <textarea 
                  value={config.knowledgeBase} 
                  onChange={(e) => setConfig({...config, knowledgeBase: e.target.value})}
                  rows={10}
                  className="w-full rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border p-2.5 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm transition-colors"
                  placeholder="Paste FAQ, Product Info, or Policies here..."
                />
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
             <div className="space-y-8 animate-in fade-in duration-300">
                {/* Brand Colors */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                     <Palette className="h-4 w-4 text-blue-500" /> Brand Style
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                     <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Primary Color</label>
                     <div className="flex flex-wrap gap-3 items-center">
                        {PRESET_COLORS.map(color => (
                           <button
                             key={color}
                             onClick={() => setConfig({...config, primaryColor: color})}
                             className={`h-8 w-8 rounded-full border-2 transition-all ${config.primaryColor === color ? 'border-slate-400 scale-110 shadow-md' : 'border-transparent hover:scale-110'}`}
                             style={{ backgroundColor: color }}
                             title={color}
                           />
                        ))}
                        <div className="h-8 w-px bg-slate-300 dark:bg-slate-600 mx-1"></div>
                        <div className="relative flex items-center">
                           <input 
                              type="color" 
                              value={config.primaryColor}
                              onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                              className="h-9 w-20 rounded cursor-pointer border-0 p-0 bg-transparent opacity-0 absolute inset-0 z-10"
                           />
                           <div className="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center" style={{ backgroundColor: config.primaryColor }}>
                           </div>
                           <span className="ml-2 text-xs font-mono text-slate-600 dark:text-slate-300">{config.primaryColor}</span>
                        </div>
                     </div>
                  </div>
                </div>

                {/* Avatar & Icon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                         <LayoutTemplate className="h-4 w-4 text-blue-500" /> Avatar
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Bot Avatar URL</label>
                          <div className="flex gap-3 items-center">
                            <img src={config.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover" />
                            <input 
                              type="text" 
                              value={config.avatarUrl} 
                              onChange={(e) => setConfig({...config, avatarUrl: e.target.value})}
                              className="flex-1 rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                              placeholder="https://..."
                            />
                          </div>
                      </div>
                   </div>
                   
                   <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                         <Sparkles className="h-4 w-4 text-blue-500" /> Launcher Icon
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
                          {[
                            { id: 'message-circle', icon: MessageCircle, label: 'Bubble' },
                            { id: 'bot', icon: Bot, label: 'Robot' },
                            { id: 'sparkles', icon: Sparkles, label: 'Stars' }
                          ].map((item) => (
                             <button
                                key={item.id}
                                onClick={() => setConfig({...config, launcherIcon: item.id as any})}
                                className={`flex-1 flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${config.launcherIcon === item.id ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-blue-300'}`}
                             >
                                <item.icon className="h-5 w-5 mb-1" />
                                <span className="text-[10px] font-medium">{item.label}</span>
                             </button>
                          ))}
                      </div>
                   </div>
                </div>

                {/* Typography & Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                       <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                         <Type className="h-4 w-4 text-blue-500" /> Typography
                       </h4>
                       <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Font Family</label>
                          <select 
                            value={config.fontFamily}
                            onChange={(e) => setConfig({...config, fontFamily: e.target.value})}
                            className="w-full rounded-md border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                             {FONTS.map(f => (
                               <option key={f.value} value={f.value}>{f.name}</option>
                             ))}
                          </select>
                       </div>
                   </div>

                   <div>
                       <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                         <LayoutTemplate className="h-4 w-4 text-blue-500" /> Widget Position
                       </h4>
                       <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4">
                          <button
                            onClick={() => setConfig({...config, position: 'bottom-left'})}
                            className={`flex-1 flex flex-col items-center p-2 rounded-lg border transition-all ${config.position === 'bottom-left' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                          >
                             <AlignLeft className="h-5 w-5 mb-1" />
                             <span className="text-[10px] font-medium">Bottom Left</span>
                          </button>
                          <button
                            onClick={() => setConfig({...config, position: 'bottom-right'})}
                            className={`flex-1 flex flex-col items-center p-2 rounded-lg border transition-all ${config.position === 'bottom-right' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-600 dark:text-blue-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'}`}
                          >
                             <AlignRight className="h-5 w-5 mb-1" />
                             <span className="text-[10px] font-medium">Bottom Right</span>
                          </button>
                       </div>
                   </div>
                </div>
             </div>
          )}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-between items-center">
           <div>
              {saveStatus === 'error' && (
                  <p className="text-sm text-red-500 flex items-center gap-1 animate-in fade-in">
                      <AlertCircle className="h-4 w-4" /> {errorMsg}
                  </p>
              )}
              {saveStatus === 'saved' && (
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1 animate-in fade-in">
                      <Save className="h-4 w-4" /> Saved Successfully
                  </p>
              )}
           </div>
          <button 
            onClick={handleSaveConfig}
            disabled={saveStatus === 'saving'}
            className="flex items-center space-x-2 bg-slate-900 dark:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors disabled:opacity-70"
          >
            {saveStatus === 'saving' ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                </>
            ) : (
                <>
                    <Save className="h-4 w-4" />
                    <span>Save Configuration</span>
                </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Preview */}
      <div className="w-full lg:w-[400px] flex flex-col bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden relative transition-colors duration-200">
         <div className="bg-slate-200 dark:bg-slate-700 p-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
           Live Preview
         </div>
         <div className={`flex-1 p-6 flex flex-col items-center justify-center relative ${config.fontFamily}`}>
            
            {/* The Chat Widget Container */}
            <div className={`w-full max-w-[350px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[500px] border border-slate-100 dark:border-slate-600 transition-all duration-300`}>
               {/* Widget Header */}
               <div className="p-4 text-white flex justify-between items-center transition-colors duration-300" style={{ backgroundColor: config.primaryColor }}>
                  <div className="flex items-center space-x-3">
                     <img src={config.avatarUrl} alt="Bot" className="h-8 w-8 rounded-full bg-white/20 object-cover" />
                     <div>
                        <h3 className="font-bold text-sm">{config.name}</h3>
                        <p className="text-[10px] opacity-80 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                        </p>
                     </div>
                  </div>
                  <button onClick={resetChat} title="Reset Chat" className="text-white/80 hover:text-white">
                    <RefreshCw className="h-4 w-4" />
                  </button>
               </div>

               {/* Messages Area */}
               <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       <div 
                         className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm transition-colors duration-300 ${
                           msg.role === 'user' 
                             ? 'text-white' 
                             : 'bg-white text-slate-800 border border-slate-200'
                         }`}
                         style={msg.role === 'user' ? { backgroundColor: config.primaryColor } : {}}
                       >
                         {msg.content}
                       </div>
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm flex space-x-1">
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                           <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                     </div>
                  )}
                  <div ref={messagesEndRef} />
               </div>

               {/* Input Area */}
               <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 bg-white">
                  <div className="flex items-center gap-2">
                     <input 
                        type="text" 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 text-sm outline-none px-2 py-2 text-slate-900 bg-white placeholder:text-slate-400"
                        disabled={isLoading}
                     />
                     <button 
                        type="submit" 
                        disabled={isLoading || !inputText.trim()}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 disabled:opacity-50 transition-colors"
                        style={{ color: !isLoading && inputText.trim() ? config.primaryColor : undefined }}
                     >
                       <Send className="h-5 w-5" />
                     </button>
                  </div>
                  <div className="text-center mt-2">
                      <p className="text-[10px] text-slate-400">Powered by BotForge</p>
                  </div>
               </form>
            </div>

            {/* Simulated Launcher Button Position */}
            <div className={`absolute bottom-6 flex flex-col items-center gap-2 ${config.position === 'bottom-left' ? 'left-8 items-start' : 'right-8 items-end'}`}>
                 <span className="text-[10px] text-slate-400 font-mono bg-white/50 px-1 rounded">Launcher Preview</span>
                 <div 
                   className="h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                   style={{ backgroundColor: config.primaryColor }}
                 >
                   {renderLauncherIcon()}
                 </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default BotBuilder;
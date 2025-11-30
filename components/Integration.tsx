import React, { useState } from 'react';
import { Copy, Check, Code, Globe, Shield, ArrowRight, MousePointer2, Layout, Settings, Play } from 'lucide-react';

const Integration: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const embedCode = `
<!-- BotForge Embed Code -->
<script>
  window.botForgeConfig = {
    botId: "bf_123456789",
    primaryColor: "#2563eb",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.botforge.app/widget/v1.js" async></script>
<!-- End BotForge Embed Code -->
  `;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Integrate Your Chatbot</h2>
        <p className="text-slate-500 dark:text-slate-400">Add the chatbot to your website in less than 2 minutes.</p>
      </div>
      
      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden group hover:border-blue-500 transition-colors">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 font-bold text-lg">1</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Configure</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Customize your bot's appearance and train it on your data.</p>
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-slate-200 dark:text-slate-800 hidden md:block">
              <ArrowRight className="h-6 w-6" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden group hover:border-blue-500 transition-colors">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 font-bold text-lg">2</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Copy Code</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Copy the Javascript snippet provided below to your clipboard.</p>
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-slate-200 dark:text-slate-800 hidden md:block">
              <ArrowRight className="h-6 w-6" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 text-center group hover:border-blue-500 transition-colors">
            <div className="h-12 w-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 font-bold text-lg">3</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Paste & Launch</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Paste before the closing body tag. Your bot is now live!</p>
         </div>
      </div>

      {/* Code Snippet Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-850/50">
          <h3 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-500" />
            Standard HTML Embed
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">Recommended</span>
        </div>
        <div className="p-6">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Copy and paste the following code snippet before the closing <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 font-mono text-xs">&lt;/body&gt;</code> tag on every page where you want the widget to appear.
          </p>
          <div className="relative group">
            <pre className="bg-slate-900 dark:bg-black text-slate-300 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-slate-800">
              {embedCode.trim()}
            </pre>
            <button 
              onClick={copyToClipboard}
              className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Integration Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Detailed Integration Guide</h3>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent dark:before:via-slate-700">
            
            {/* Step 1 */}
            <div className="relative flex items-start group">
                <div className="absolute left-0 top-0 mt-1 ml-2 h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 group-hover:border-blue-500 transition-colors z-10"></div>
                <div className="ml-12 w-full">
                    <h4 className="flex items-center text-base font-semibold text-slate-900 dark:text-white mb-2">
                        <Settings className="h-5 w-5 mr-2 text-blue-500" />
                        1. Configuration
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                        Before embedding, ensure your chatbot is properly configured. Navigate to the <strong>Bot Builder</strong> tab to customize the avatar, brand colors, and welcome message. 
                        Most importantly, check your <strong>Settings</strong> to ensure your Gemini API Key is saved and valid. The bot will not respond without a valid API key.
                    </p>
                    <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-400 p-3 rounded-r text-xs text-amber-800 dark:text-amber-200">
                        Tip: Test your bot in the Simulator first to ensure it answers questions correctly before going live.
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start group">
                <div className="absolute left-0 top-0 mt-1 ml-2 h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 group-hover:border-blue-500 transition-colors z-10"></div>
                <div className="ml-12 w-full">
                    <h4 className="flex items-center text-base font-semibold text-slate-900 dark:text-white mb-2">
                        <Code className="h-5 w-5 mr-2 text-blue-500" />
                        2. Copy & Place Code
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Click the copy button in the "Standard HTML Embed" section above. Open your website's HTML file (usually <code>index.html</code>) or your CMS template editor (WordPress, Shopify, etc.).
                        Locate the closing <code>&lt;/body&gt;</code> tag at the very bottom of the file. Paste the copied snippet immediately before this tag.
                    </p>
                </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start group">
                <div className="absolute left-0 top-0 mt-1 ml-2 h-6 w-6 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 group-hover:border-blue-500 transition-colors z-10"></div>
                <div className="ml-12 w-full">
                    <h4 className="flex items-center text-base font-semibold text-slate-900 dark:text-white mb-2">
                        <Play className="h-5 w-5 mr-2 text-blue-500" />
                        3. Paste & Launch
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Save your HTML file and deploy your website. Navigate to your live site in a new browser tab. You should see the chat bubble appear in the configured position (default is bottom-right).
                        Click the bubble to open the chat window and send a test message "Hello" to verify that the bot responds as expected.
                    </p>
                </div>
            </div>

          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="h-10 w-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
            <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Domain Whitelisting</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Secure your bot by only allowing it to load on specific domains to prevent unauthorized usage.
          </p>
          <input 
            type="text" 
            placeholder="e.g. example.com, mysite.org" 
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-colors placeholder:text-slate-400" 
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
           <div className="h-10 w-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">GDPR Compliance</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Automatically show a consent banner before starting the chat session to comply with EU regulations.
          </p>
          <div className="flex items-center space-x-3">
             <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:right-0 checked:border-blue-600" />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 cursor-pointer"></label>
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Enable Consent Banner</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
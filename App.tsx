import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import BotBuilder from './components/BotBuilder';
import Integration from './components/Integration';
import Settings from './components/Settings';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  // Global state for API Key (required for demo functionality)
  const [apiKey, setApiKey] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    // Check local storage or prompt user
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
        setApiKey(storedKey);
    } else {
        // Delay modal slightly for better UX
        const timer = setTimeout(() => setIsModalOpen(true), 1000);
        return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const handleSetApiKey = (key: string) => {
      setApiKey(key);
      localStorage.setItem('gemini_api_key', key);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <HashRouter>
      <Layout 
        setApiKeyModalOpen={setIsModalOpen} 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/builder" element={<BotBuilder apiKey={apiKey} />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/settings" element={<Settings apiKey={apiKey} setApiKey={handleSetApiKey} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      
      <ApiKeyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        apiKey={apiKey} 
        setApiKey={handleSetApiKey} 
      />
    </HashRouter>
  );
};

export default App;
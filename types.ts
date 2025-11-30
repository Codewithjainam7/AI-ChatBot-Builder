export enum PlanType {
  STARTER = 'Starter',
  BUSINESS = 'Business',
  ENTERPRISE = 'Enterprise'
}

export interface BotConfig {
  id: string;
  name: string;
  avatarUrl: string;
  primaryColor: string;
  welcomeMessage: string;
  systemInstruction: string;
  knowledgeBase: string; // Simulating RAG data
  isActive: boolean;
  position?: 'bottom-right' | 'bottom-left';
  launcherIcon?: 'message-circle' | 'bot' | 'sparkles';
  fontFamily?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface AnalyticsData {
  date: string;
  conversations: number;
  messages: number;
  sentiment: number;
}
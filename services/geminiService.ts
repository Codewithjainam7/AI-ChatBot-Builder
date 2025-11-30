import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

// In a real production app, this call would happen on the Node.js backend 
// to protect the API key. For this Builder/Demo, we call directly from client.
export const generateBotResponse = async (
  apiKey: string,
  history: Message[],
  systemInstruction: string,
  knowledgeBase: string
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey });
  
  // Combine system instruction with knowledge base for context (Simulating RAG)
  const fullSystemInstruction = `
    ${systemInstruction}
    
    RELIES HEAVILY ON THE FOLLOWING KNOWLEDGE BASE TO ANSWER:
    ${knowledgeBase}
    
    If the answer is not in the knowledge base, politely say you don't have that information.
    Keep answers concise and helpful.
  `;

  // Convert internal message format to Gemini format
  // We only send the last few messages to manage context window in this demo
  const recentHistory = history.slice(-10);
  
  try {
    const model = 'gemini-2.5-flash';
    
    // The last message from the user is not in 'history' yet for the API call usually,
    // but in our UI state it is. Ideally, we separate the new message.
    // However, to keep this service simple, let's assume the 'history' passed includes the latest user message.
    
    const lastMessage = history[history.length - 1];
    const previousHistory = history.slice(0, -1);
    
    const chatSession = ai.chats.create({
        model: model,
        config: {
          systemInstruction: fullSystemInstruction,
        },
        history: previousHistory.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }))
    });

    const result: GenerateContentResponse = await chatSession.sendMessage({
        message: lastMessage.content
    });

    return result.text || "I'm sorry, I couldn't generate a response.";

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    let errorMessage = "I'm having trouble connecting to the server right now.";
    const errString = error.toString().toLowerCase();

    // Enhanced Error Handling
    if (errString.includes('api key') || error.status === 403) {
      errorMessage = "Error: Invalid API Key. Please check your settings.";
    } else if (errString.includes('quota') || error.status === 429) {
      errorMessage = "Error: Rate limit exceeded. Please try again later.";
    } else if (errString.includes('safety') || (error.response && error.response.promptFeedback && error.response.promptFeedback.blockReason)) {
        errorMessage = "I cannot generate a response to that input due to safety guidelines.";
    } else if (errString.includes('network') || errString.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection.";
    }

    return errorMessage;
  }
};
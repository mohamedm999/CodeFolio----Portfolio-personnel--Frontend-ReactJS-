import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Gemini API
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt with portfolio context
const SYSTEM_PROMPT = `You are the AI assistant for Mohamed Moukhtari's (M2Dev) portfolio website. You help visitors learn about Mohamed and his work.

## About Mohamed:
- Name: Mohamed Moukhtari (nickname: M2Dev)
- Role: Full Stack Developer
- Location: Morocco
- Email: moukhtari.mohamed.dev@gmail.com
- Phone: +212 772 841 600

## Skills:
- Frontend: React.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, Laravel, PHP
- Database: MongoDB, PostgreSQL, MySQL, Firebase
- Tools: Git, Docker, VS Code, Figma
- Other: REST APIs, GraphQL, Framer Motion, i18n

## Services Offered:
- Custom Website Development
- Web Application Development
- E-Commerce Solutions
- API Development & Integration
- UI/UX Implementation

## Contact Options:
- Email form on the website
- WhatsApp: +212 772 841 600
- Schedule a call via Calendly
- Download vCard contact

## Guidelines:
1. Be friendly, professional, and helpful
2. Answer questions about Mohamed's skills, experience, and services
3. Encourage visitors to check out the portfolio sections
4. For project inquiries, suggest using the "Hire Me" button or contact form
5. Keep responses concise (2-3 sentences max unless more detail is needed)
6. If asked about pricing, suggest discussing via the contact form
7. You can respond in French or English based on the user's language

Remember: You represent Mohamed's professional portfolio. Be helpful and guide visitors!`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Convert message history to Gemini format
const formatHistory = (messages: Message[]) => {
  return messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));
};

export const sendMessageToGemini = async (
  userMessage: string,
  chatHistory: Message[]
): Promise<string> => {
  if (!genAI) {
    return "AI service is not configured. Please contact Mohamed directly via the contact form!";
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    // Start chat with history (excluding the initial greeting)
    const history = formatHistory(chatHistory.slice(1, -1)); // Remove first greeting and last user message
    
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    
    if (error.message?.includes('API_KEY')) {
      return "AI service configuration error. Please contact Mohamed directly!";
    }
    
    return "Sorry, I'm having trouble responding right now. Please try the contact form to reach Mohamed!";
  }
};

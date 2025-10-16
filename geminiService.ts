import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this environment, we assume it's always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function executePythonCode(code: string): Promise<string> {
  try {
    const prompt = `
      You are a Python interpreter. Your sole purpose is to execute the provided Python code and return the exact standard output.
      - Do NOT provide any explanation, commentary, or formatting like \`\`\`python.
      - If the code executes successfully, return only what would be printed to the console.
      - If the code produces an error, return only the standard Python error message (e.g., "SyntaxError: invalid syntax").
      - Treat the input as a complete script.

      Execute this code:
      ---
      ${code}
      ---
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
        // Use a low temperature for deterministic, interpreter-like behavior
        temperature: 0.0,
      }
    });
    
    // Using response.text is the direct way to get the generated content.
    return response.text;
  } catch (error) {
    console.error("Error executing code via Gemini API:", error);
    if (error instanceof Error) {
        return `API Error: ${error.message}`;
    }
    return "An unknown error occurred while contacting the AI service.";
  }
}

export async function getChatbotResponse(question: string): Promise<string> {
    try {
        const prompt = `
            You are CodeBot, a friendly and expert Python tutor for the CodeQuest platform. 
            Your goal is to help users understand Python concepts clearly.
            When a user asks a question, provide a concise, easy-to-understand explanation.
            Use code examples formatted in Markdown when they are helpful.
            Keep your tone encouraging and supportive.
            ---
            User's question: ${question}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.5,
            }
        });

        return response.text;
    } catch (error) {
        console.error("Error getting chatbot response from Gemini API:", error);
        if (error instanceof Error) {
            return `API Error: ${error.message}`;
        }
        return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
    }
}

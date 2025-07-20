// This is the fix
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please check your environment variables.");
}

// Now you can use 'apiKey' safely, and TypeScript will not complain.
// Example: const genAI = new GoogleGenerativeAI(apiKey);
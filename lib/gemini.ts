import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';

// 1. Safely get the API Key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // This stops the application from running if the API key is missing.
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please check your environment variables.");
}

// 2. Initialize the Gemini AI client with the validated key
const genAI = new GoogleGenerativeAI(apiKey);

/**
 * A safe function to generate text from a prompt.
 * It checks for a valid prompt and safely handles the API response.
 */
export async function generateText(prompt: string): Promise<string> {
  // Ensure the prompt is a valid string before making an API call
  if (!prompt) {
    console.error("generateText was called with an empty prompt.");
    return "";
  }

  try {
    // IMPORTANT: Use the correct model name here. For example, Gemini 2.5 Flash.
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-latest" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Safely access the text from the response
    const text = response?.text() ?? '';
    return text;

  } catch (error) {
    console.error("Error generating text from Gemini:", error);
    return ""; // Return an empty string on error
  }
}

/**
 * A safe function for a hypothetical case where you might get image data.
 * This pattern addresses the "'response.generatedImages' is possibly 'undefined'" error.
 */
export async function getImageUrlFromResponse(prompt: string): Promise<string> {
    if (!prompt) {
        return "";
    }
    
    // This is a placeholder for your actual API call.
    const mockResponse = {
        text: "some text",
        generatedImages: [
            { url: "https://example.com/image.png" }
        ]
    };

    // Safely access the nested URL.
    const imageUrl = mockResponse?.generatedImages?.[0]?.url ?? '';

    return imageUrl;
}
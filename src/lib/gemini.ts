import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set this in your Netlify environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * Generiert Text und stellt sicher, dass immer ein String zurückgegeben wird.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    // LÖSUNG: response?.text() kann undefined sein. ?? '' stellt sicher,
    // dass wir immer einen String zurückgeben. Dies behebt TS2322.
    return result.response?.text() ?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

/**
 * Ruft Bilddaten ab und stellt sicher, dass immer ein String zurückgegeben wird.
 */
export async function getImageData(prompt: string): Promise<string> {
    if (!prompt) return "";
    try {
      const result = await model.generateContent(prompt);
      // LÖSUNG: Der lange Pfad wird mit Optional Chaining (?.) abgesichert
      // und am Ende mit ?? '' als String garantiert.
      const base64ImageBytes = result.response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
      return base64ImageBytes;
    } catch (error) {
      console.error("Error in getImageData:", error);
      return "";
    }
}

/**
 * Ruft Text ab und versucht, ihn als JSON zu parsen.
 */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const result = await model.generateContent(prompt);
    const text = result.response?.text();

    // LÖSUNG: Nur wenn Text ein valider String ist, wird geparst.
    if (text) {
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error("Error in getJsonFromText:", error);
    return null;
  }
}
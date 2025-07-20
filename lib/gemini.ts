// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

/* ---------- 0. Safe API key ---------- */
const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) ?? '';
if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is missing');

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

/* ---------- 1. Plain text ---------- */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return '';
  try {
    return (await model.generateContent(prompt)).response.text() ?? '';
  } catch {
    return '';
  }
}

/* ---------- 2. Image prompt ---------- */
export async function getImageData(prompt: string): Promise<string> {
  if (!prompt) return '';
  try {
    const res = await model.generateContent(prompt);
    return res.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
  } catch {
    return '';
  }
}

/* ---------- 3. JSON helper ---------- */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const text = (await model.generateContent(prompt)).response.text();
    return text ? JSON.parse(text) as T : null;
  } catch {
    return null;
  }
}
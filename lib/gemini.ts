// lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) ?? '';
if (!apiKey) throw new Error('VITE_GEMINI_API_KEY missing');

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return '';
  try {
    return (await model.generateContent(prompt)).response.text() ?? '';
  } catch {
    return '';
  }
}

export async function getImageData(prompt: string): Promise<string> {
  if (!prompt) return '';
  try {
    const res = await model.generateContent(prompt);
    return res.response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data ?? '';
  } catch {
    return '';
  }
}

export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const text = (await model.generateContent(prompt)).response.text() ?? '';
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}
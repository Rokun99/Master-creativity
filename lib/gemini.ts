import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined. Please set this in your Netlify environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

/**
 * Generiert Text aus einem Prompt und stellt sicher, dass immer ein String zurückgegeben wird.
 * @param prompt Der Eingabe-Prompt.
 * @returns Der generierte Text oder ein leerer String im Fehlerfall oder bei keiner Antwort.
 */
export async function generateText(prompt: string): Promise<string> {
  if (!prompt) return "";
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    // LÖSUNG: Wir nutzen optionales Chaining (?.) um sicher auf.text() zuzugreifen,
    // und den Nullish-Coalescing-Operator (??) um einen leeren String ('') als
    // Standardwert bereitzustellen, falls das Ergebnis null oder undefined ist.
    // Dies behebt den Fehler TS2322.
    return response?.text()?? '';
  } catch (error) {
    console.error("Error in generateText:", error);
    return "";
  }
}

/**
 * Ruft Bilddaten ab und stellt sicher, dass immer ein String zurückgegeben wird.
 * @param prompt Der Eingabe-Prompt für die Bildgenerierung.
 * @returns Die Base64-Bilddaten oder ein leerer String im Fehlerfall.
 */
export async function getImageData(prompt: string): Promise<string> {
    if (!prompt) return "";
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;

      // LÖSUNG: Der Pfad zu den Bilddaten ist tief verschachtelt. Jeder Teil könnte
      // undefined sein. Die Kombination aus optionalem Chaining (?.) und dem
      // Nullish-Coalescing-Operator (?? '') am Ende garantiert, dass immer ein
      // String zurückgegeben wird, selbst wenn ein Teil des Pfades fehlt.
      const base64ImageBytes = response?.candidates?.?.content?.parts?.?.inlineData?.data?? '';
      return base64ImageBytes;
    } catch (error) {
      console.error("Error in getImageData:", error);
      return "";
    }
}

/**
 * Ruft Text ab und versucht, ihn als JSON zu parsen.
 * @param prompt Der Eingabe-Prompt, der eine JSON-Antwort erzeugen soll.
 * @returns Ein geparstes Objekt oder null im Fehlerfall.
 */
export async function getJsonFromText<T>(prompt: string): Promise<T | null> {
  if (!prompt) return null;
  try {
    const result = await model.generateContent(prompt);
    
    // LÖSUNG: Zuerst den Text sicher abrufen. Er könnte undefined sein.
    const text = result.response?.text();

    // Nur wenn Text existiert (weder null noch undefined noch leer),
    // versuchen wir, ihn zu parsen.
    if (text) {
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        console.error("Fehler beim Parsen von JSON aus der Modellantwort:", e);
        console.error("Die fehlerhafte Antwort war:", text);
        return null;
      }
    }
    
    // Wenn kein Text von der API zurückkam, geben wir null zurück.
    return null;
  } catch (error) {
    console.error("Error in getJsonFromText:", error);
    return null;
  }
}
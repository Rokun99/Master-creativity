import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { JournalEntry } from "../storage";

// No more singleton pattern. Create a new instance on demand and check key every time.
const getAi = (): GoogleGenAI => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        console.error("VITE_GEMINI_API_KEY environment variable not set");
        throw new Error("API key not configured.");
    }
    return new GoogleGenAI({ apiKey });
}

export async function getAiChatResponse(history: { role: string, parts: { text: string }[] }[], systemInstruction: string, newMessage: string): Promise<string> {
    const ai = getAi();
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
        history,
    });
    const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
    return response.text;
}

export async function generateImageForPrompt(prompt: string, systemInstruction: string): Promise<string> {
    const ai = getAi();
    const fullPrompt = `${systemInstruction}: ${prompt}`;
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: fullPrompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
        },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
}

export async function getStructuredFeedback(prompt: string, systemInstruction: string): Promise<any> {
    const ai = getAi();
    const fullPrompt = `${systemInstruction}\n\nUser's idea to review:\n"${prompt}"`;
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    like: { type: Type.STRING },
                    wish: { type: Type.STRING },
                    whatIf: { type: Type.STRING },
                },
                required: ["like", "wish", "whatIf"]
            },
        },
    });

    return JSON.parse(response.text);
}

export async function generateIdeas(systemInstruction: string): Promise<any> {
    const ai = getAi();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemInstruction,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                    },
                    required: ["title", "description"]
                },
            },
        },
    });
    
    return JSON.parse(response.text);
}


export async function generateDnaReport(journalEntries: JournalEntry[], systemInstruction: string): Promise<any> {
    const ai = getAi();

    const fullText = journalEntries
        .sort((a, b) => a.dayId - b.dayId)
        .map(entry => `Day ${entry.dayId}:\n${entry.content.map(msg => `${msg.sender}: ${msg.text}`).join('\n')}`)
        .join('\n\n---\n\n');

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemInstruction}\n\nHere are the user's complete journal entries:\n\n${fullText}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    archetype: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING }
                        },
                         required: ["name", "description"]
                    },
                    themes: { type: Type.ARRAY, items: { type: Type.STRING } },
                    breakthrough: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.INTEGER },
                            quote: { type: Type.STRING }
                        },
                        required: ["day", "quote"]
                    },
                    pathForward: { type: Type.ARRAY, items: { type: Type.STRING } },
                    wordCloud: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                text: { type: Type.STRING },
                                value: { type: Type.INTEGER }
                            },
                            required: ["text", "value"]
                        }
                    },
                },
                required: ["archetype", "themes", "breakthrough", "pathForward", "wordCloud"]
            },
        },
    });
    
    return JSON.parse(response.text);
}

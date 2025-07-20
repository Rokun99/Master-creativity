
import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { GoogleGenAI, Type } from "@google/genai";
import { Icon } from './Header';

interface Idea {
    title: string;
    description: string;
}

interface IdeaGeneratorModalProps {
    onClose: () => void;
}

const IdeaCard: React.FC<{ idea: Idea, index: number }> = ({ idea, index }) => {
    return (
        <div className="idea-card" style={{ animationDelay: `${index * 100}ms` }}>
            <h4>{idea.title}</h4>
            <p>{idea.description}</p>
        </div>
    );
};

export const IdeaGeneratorModal: React.FC<IdeaGeneratorModalProps> = ({ onClose }) => {
    const { t } = useTranslation();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [ideas, setIdeas] = useState<Idea[]>([]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            setError(t('exercise.chat.error.unavailable'));
            return;
        }

        setIsLoading(true);
        setError('');
        setIdeas([]);

        try {
            const ai = new GoogleGenAI({ apiKey });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: t('ideaGenerator.modal.systemPrompt', { prompt }),
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
            
            const generatedIdeas = JSON.parse(response.text);
            setIdeas(generatedIdeas);

        } catch (e) {
            console.error("Idea Generation Error:", e);
            setError(t('ideaGenerator.modal.error.generic'));
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="idea-generator-modal-overlay">
            <div className="idea-generator-modal-content">
                <header className="idea-generator-header">
                    <h2>{t('ideaGenerator.modal.title')}</h2>
                    <button className="modal-close-button" onClick={onClose} aria-label={t('ideaGenerator.modal.close')}>×</button>
                </header>
                <p>{t('ideaGenerator.modal.description')}</p>
                <form className="idea-generator-form" onSubmit={handleGenerate}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t('ideaGenerator.modal.placeholder')}
                        aria-label={t('ideaGenerator.modal.placeholder')}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !prompt.trim()}>
                        {isLoading ? t('ideaGenerator.modal.button.loading') : t('ideaGenerator.modal.button.generate')}
                    </button>
                </form>

                <div className="idea-results">
                    {isLoading && (
                        <div className="idea-generator-loader-container">
                            <div className="loader"></div>
                        </div>
                    )}
                    {error && <p className="error-message">{error}</p>}
                    {ideas.length > 0 && (
                        <div className="idea-card-list">
                            {ideas.map((idea, index) => (
                                <IdeaCard key={index} idea={idea} index={index} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

"use server"
import {
  GoogleGenAI,
} from '@google/genai';

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'application/json',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 8192,

  };
 
  const model = 'gemini-2.5-flash-preview-04-17';
  export const generateStudyGuide = async (userPrompt: string) => {
    const contents = [
      {
        role: 'user',
        parts:[{text:userPrompt}],
      }
    ];
    const courseOutline = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of courseOutline){
      result += chunk.text || '';
    }
    return result;
  } 



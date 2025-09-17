
"use server"
import {
  GoogleGenAI,
} from '@google/genai';

  // Initialize AI client only when needed and with proper error handling
  const getAI = () => {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  };

  const config = {
    responseMimeType: 'application/json',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 8192,
  };
 
  const model = 'gemini-1.5-flash';
  export const generateStudyGuide = async (userPrompt: string) => {
    try {
      const ai = getAI();
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
    } catch (error) {
      console.error('Error generating study guide:', error);
      throw new Error('Failed to generate study guide. Please try again.');
    }
  } 

  export const generateStudyMaterialChapters = async (userPrompt: string) => {
    try {
      const ai = getAI();
      const contents = [
        {
          role: 'user',
          parts: [{text:userPrompt}]
        }
      ];
      const studyMaterialChapters = await ai.models.generateContentStream({
        model,
        config,
        contents
      });

      let result = '';
      for await (const chunk of studyMaterialChapters){
        result += chunk.text || '';
      }
      return result;
    } catch (error) {
      console.error('Error generating study material chapters:', error);
      throw new Error('Failed to generate study material chapters. Please try again.');
    }
  }



import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';

// We will initialize the AI client lazily to prevent the app from crashing if the API key is not set.
let ai: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  // Fix: Adhere to the guideline of using process.env.API_KEY. This also resolves the TypeScript error.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    throw new Error("AI functionality is not configured. Please set up your API_KEY in a .env file.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}


export async function generateDescription(title: string, category: Category): Promise<string> {
  try {
    const gemini = getAiClient();
    
    const prompt = `Write a compelling, friendly, and honest product description for a listing on a second-hand marketplace called "EcoFinds".
    
    The product is:
    Title: ${title}
    Category: ${category}

    Instructions:
    - Highlight key features and potential appeal to a buyer.
    - Mention that it is a pre-loved/second-hand item.
    - Keep the description between 40 and 80 words.
    - Do not use markdown or formatting. Just plain text.
    - End with a positive and inviting tone.`;

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error('Error generating description with Gemini:', error);
    if (error instanceof Error && error.message.includes("API_KEY")) {
        throw new Error("AI functionality is not configured. Please check your API_KEY.");
    }
    throw new Error('Failed to generate description. Please try again later.');
  }
}

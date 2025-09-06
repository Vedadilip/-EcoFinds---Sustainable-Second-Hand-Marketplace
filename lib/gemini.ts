import { GoogleGenAI } from "@google/genai";
import { Category } from '../types';

// The API key must be set in the environment variables as API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateDescription(title: string, category: Category): Promise<string> {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    throw new Error("AI functionality is not configured.");
  }

  try {
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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text.trim();
  } catch (error) {
    console.error('Error generating description with Gemini:', error);
    throw new Error('Failed to generate description. Please try again later.');
  }
}

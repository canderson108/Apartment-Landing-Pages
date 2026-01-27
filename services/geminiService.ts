
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeUtilityBill(base64Image: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: "Extract the average monthly kWh usage and the current rate from this utility bill. Also, provide a 1-sentence comparison showing how much they could save if our rate is 11.2 cents per kWh. Return only the data in a clear format."
          }
        ]
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing bill:", error);
    return "Unable to analyze the bill. Please enter your usage manually for a comparison.";
  }
}

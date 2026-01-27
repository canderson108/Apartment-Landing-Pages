import { GoogleGenAI } from "@google/genai";

/**
 * Analyzes a utility bill image using Gemini 3 Flash to predict potential savings.
 * Following SDK guidelines, we instantiate GoogleGenAI immediately before the call.
 */
export async function analyzeUtilityBill(base64Image: string) {
  // Always use a fresh instance to ensure correct API key configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              // The base64 data should not include the mime-type prefix as it's split in App.tsx
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

    // Directly access the .text property from GenerateContentResponse
    return response.text;
  } catch (error) {
    console.error("Error analyzing bill with Gemini:", error);
    return "Unable to analyze the bill automatically. Please enter your usage manually for a comparison.";
  }
}
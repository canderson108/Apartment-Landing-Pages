import { GoogleGenAI } from "@google/genai";

/**
 * Analyzes a utility bill (image or PDF) using Gemini 3 Flash to predict potential savings.
 * Following SDK guidelines, we instantiate GoogleGenAI immediately before the call.
 */
export async function analyzeUtilityBill(base64Data: string, mimeType: string, targetRate: number) {
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
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: `Extract the average monthly kWh usage and the current rate from this utility bill. Provide a comparison showing how much they could save if our rate is ${targetRate} cents per kWh. 
            
            Return the result in this exact format:
            **Average Monthly Usage:** [value] kWh **Current Energy Rate:** [value] cents per kWh **Comparison:** By switching to a rate of ${targetRate} cents per kWh, you would save approximately **$[savings amount]** on your monthly energy charges.
            
            Ensure any dollar amounts (like the savings) are wrapped in double asterisks for bolding, e.g., **$202.11**.`
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
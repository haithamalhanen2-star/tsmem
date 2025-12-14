import { GoogleGenAI } from "@google/genai";
import { AppMode } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to remove data URL prefix
const stripBase64 = (dataUrl: string) => dataUrl.split(',')[1];

export const generateImage = async (
  mode: AppMode,
  img1Base64: string | null,
  img2Base64: string | null,
  customPrompt: string
): Promise<string> => {
  if (!img1Base64) throw new Error("Image 1 is required");

  const model = 'gemini-2.5-flash-image';
  
  const parts: any[] = [];

  // Add first image
  parts.push({
    inlineData: {
      data: stripBase64(img1Base64),
      mimeType: 'image/jpeg', 
    },
  });

  // Add second image if needed and available
  if (img2Base64) {
    parts.push({
      inlineData: {
        data: stripBase64(img2Base64),
        mimeType: 'image/jpeg',
      },
    });
  }

  let prompt = "";

  switch (mode) {
    case AppMode.HUG_PAST_SELF:
      prompt = "Merge these two images photorealistically. The first image is the adult version, and the second image is the child version of the same person. Generate an image where the adult is warmly hugging the child. Preserve the facial features and identity of both exactly as they appear in the source images. High quality, emotional reunion.";
      break;
    case AppMode.COUPLE_KISS:
      prompt = "Merge these two images into a romantic scene. The first image is a man and the second is a woman. Generate a photorealistic image of them kissing passionately. Preserve their facial features, hairstyles, and identities exactly. Cinematic lighting, high detail.";
      break;
    case AppMode.STANDING_TOGETHER:
      prompt = "Combine these two people into a single photorealistic image standing next to each other. Preserve the facial features, heights, and body types exactly as shown in the source images. Ensure the lighting and shadows match naturally.";
      break;
    case AppMode.ZOO_BACKGROUND:
      prompt = "Keep the person/subject in this image exactly the same, but change the background to a beautiful, vibrant zoo with lush nature and animals in the distance. Photorealistic, high quality.";
      break;
    case AppMode.SMOOTH_FACE:
      prompt = "Retouch the face in this image. Smooth the skin, remove blemishes, and improve lighting while keeping the person's identity and main features exactly the same. Professional beauty photography style.";
      break;
    case AppMode.CUSTOM_TEXT:
      prompt = `Edit this image according to the following instruction: ${customPrompt}. Preserve the main subject's identity unless asked otherwise.`;
      break;
  }

  parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: parts,
      },
    });

    // Check for inline data (image) output
    // The response might contain text if it failed to generate an image or explanation, 
    // but typically for this model it returns image in parts.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    
    // Fallback if no image found in standard location (rare with valid request)
    throw new Error("No image generated. Please try again or adjust your prompt.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
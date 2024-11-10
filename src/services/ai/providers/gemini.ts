import { GoogleGenerativeAI } from "@google/generative-ai";
import { AIConfig } from "../types";

export async function generateWithGemini(
  config: AIConfig,
  jobDescription: string,
  resumeText: string
): Promise<string> {
  const apiKey = config.apiKey || import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key is required");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: config.model });

  const prompt = `
    As an ATS expert and professional resume writer, analyze the following job description and current resume. 
    Provide an optimized version of the resume that:
    1. Aligns keywords with the job description
    2. Highlights relevant experience and skills
    3. Uses ATS-friendly formatting
    4. Quantifies achievements where possible

    Job Description:
    ${jobDescription}

    Current Resume:
    ${resumeText}

    Please provide the optimized resume in a clear, professional format.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

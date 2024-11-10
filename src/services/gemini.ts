import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

export async function optimizeResume(jobDescription: string, resumeText: string) {
  if (!API_KEY) {
    throw new Error('Please configure your Gemini API key in the environment variables');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw error;
  }
}
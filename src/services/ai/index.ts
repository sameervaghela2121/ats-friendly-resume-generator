import { generateWithOpenAI } from './providers/openai';
import { generateWithGemini } from './providers/gemini';
import { generateWithClaude } from './providers/claude';
import { AIConfig, AIProvider } from './types';

export async function optimizeResume(
  config: AIConfig,
  jobDescription: string,
  resumeText: string
): Promise<string> {
  try {
    switch (config.provider) {
      case 'openai':
        return await generateWithOpenAI(config, jobDescription, resumeText);
      case 'gemini':
        return await generateWithGemini(config, jobDescription, resumeText);
      case 'claude':
        return await generateWithClaude(config, jobDescription, resumeText);
      default:
        throw new Error('Invalid AI provider');
    }
  } catch (error) {
    console.error('Error optimizing resume:', error);
    throw error;
  }
}
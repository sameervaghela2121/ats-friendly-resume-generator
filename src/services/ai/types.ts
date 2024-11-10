export type AIProvider = 'openai' | 'gemini' | 'claude';
export type AIModel = 'gpt-4' | 'gpt-3.5-turbo' | 'gemini-pro' | 'claude-3-opus' | 'claude-3-sonnet';

export interface AIConfig {
  provider: AIProvider;
  model: AIModel;
  apiKey?: string;
}

export const DEFAULT_MODELS: Record<AIProvider, AIModel[]> = {
  openai: ['gpt-4', 'gpt-3.5-turbo'],
  gemini: ['gemini-pro'],
  claude: ['claude-3-opus', 'claude-3-sonnet']
};
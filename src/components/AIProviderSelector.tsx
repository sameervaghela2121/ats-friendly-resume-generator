import React from 'react';
import { AIProvider, AIModel, DEFAULT_MODELS } from '../services/ai/types';

interface AIProviderSelectorProps {
  selectedProvider: AIProvider;
  selectedModel: AIModel;
  apiKey: string;
  onProviderChange: (provider: AIProvider) => void;
  onModelChange: (model: AIModel) => void;
  onApiKeyChange: (apiKey: string) => void;
}

export function AIProviderSelector({
  selectedProvider,
  selectedModel,
  apiKey,
  onProviderChange,
  onModelChange,
  onApiKeyChange
}: AIProviderSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          AI Provider
        </label>
        <select
          value={selectedProvider}
          onChange={(e) => onProviderChange(e.target.value as AIProvider)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="openai">OpenAI (GPT)</option>
          <option value="gemini">Google Gemini</option>
          <option value="claude">Anthropic Claude</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Model
        </label>
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value as AIModel)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {DEFAULT_MODELS[selectedProvider].map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          API Key (Optional)
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder="Enter your API key (optional)"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="mt-1 text-xs text-gray-500">
          If not provided, our default API key will be used
        </p>
      </div>
    </div>
  );
}
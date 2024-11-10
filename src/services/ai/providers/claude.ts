import Anthropic from "@anthropic-ai/sdk";
import { AIConfig } from "../types";

export async function generateWithClaude(
  config: AIConfig,
  jobDescription: string,
  resumeText: string
): Promise<string> {
  const apiKey = config.apiKey || import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Claude API key is required");
  }

  const anthropic = new Anthropic({
    apiKey,
  });

  const response = await anthropic.messages.create({
    model: config.model,
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `
          As an ATS expert and professional resume writer, please optimize this resume for ATS compatibility based on the job description.
          Focus on:
          1. Keyword alignment with the job description
          2. Highlighting relevant experience
          3. ATS-friendly formatting
          4. Quantifying achievements

          Job Description:
          ${jobDescription}

          Current Resume:
          ${resumeText}
        `,
      },
    ],
  });

  return response.content[0].text;
}

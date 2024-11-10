import OpenAI from "openai";
import { AIConfig } from "../types";

export async function generateWithOpenAI(
  config: AIConfig,
  jobDescription: string,
  resumeText: string
): Promise<string> {
  const apiKey = config.apiKey || import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is required");
  }

  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const response = await openai.chat.completions.create({
    model: config.model,
    messages: [
      {
        role: "system",
        content:
          "You are an expert ATS resume optimizer and professional resume writer.",
      },
      {
        role: "user",
        content: `
          Please optimize this resume for ATS compatibility based on the job description.
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
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "";
}

import React, { useState } from "react";
import { FileUp, Wand2 } from "lucide-react";
import { FileUpload } from "./components/FileUpload";
import { ResumePreview } from "./components/ResumePreview";
import { AIProviderSelector } from "./components/AIProviderSelector";
import { optimizeResume } from "./services/ai";
import { AIProvider, AIModel, DEFAULT_MODELS } from "./services/ai/types";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [optimizedResume, setOptimizedResume] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // AI Configuration state
  const [selectedProvider, setSelectedProvider] =
    useState<AIProvider>("gemini");
  const [selectedModel, setSelectedModel] = useState<AIModel>(
    DEFAULT_MODELS.gemini[0]
  );
  const [apiKey, setApiKey] = useState("");

  const handleResumeUpload = (file: File) => {
    setResumeFile(file);
  };

  const handleProviderChange = (provider: AIProvider) => {
    setSelectedProvider(provider);
    setSelectedModel(DEFAULT_MODELS[provider][0]);
  };

  const handleOptimize = async () => {
    if (!resumeFile || !jobDescription) return;

    setIsLoading(true);
    try {
      const resumeText = await resumeFile.text();
      const optimized = await optimizeResume(
        {
          provider: selectedProvider,
          model: selectedModel,
          apiKey: apiKey || undefined,
        },
        jobDescription,
        resumeText
      );
      setOptimizedResume(optimized);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Error optimizing resume. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Wand2 className="w-12 h-12 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI-Powered Resume Optimizer
            </h1>
            <p className="text-lg text-gray-600">
              Optimize your resume with multiple AI providers
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <AIProviderSelector
                selectedProvider={selectedProvider}
                selectedModel={selectedModel}
                apiKey={apiKey}
                onProviderChange={handleProviderChange}
                onModelChange={setSelectedModel}
                onApiKeyChange={setApiKey}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description
                </label>
                <textarea
                  className="w-full h-16 p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <FileUpload
                onFileSelect={handleResumeUpload}
                accept=".pdf,.txt,.doc,.docx"
                label="Upload your current resume"
              />

              <button
                onClick={handleOptimize}
                disabled={!resumeFile || !jobDescription || isLoading}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center space-x-2
                  ${
                    !resumeFile || !jobDescription || isLoading
                      ? "bg-gray-400"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>Optimize Resume</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Optimized Resume</h2>
              {optimizedResume ? (
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {optimizedResume}
                  </pre>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <FileUp className="w-12 h-12 mx-auto mb-4" />
                  <p>Upload your resume and job description to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Wand2 } from "lucide-react";
import AIOptimizer from "./pages/AIOptimizer";
import ResumeForm from "./pages/ResumeForm";
import Template from "./pages/Template";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Wand2 className="h-8 w-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Resume Builder
                </span>
              </div>
              <div className="ml-6 flex space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  AI Optimizer
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Resume Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<AIOptimizer />} />
        <Route path="/resume" element={<ResumeForm />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </div>
  );
}

export default App;

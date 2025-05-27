import { Lightbulb, GitCommitHorizontal, Upload, Bot } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-violet-600" />,
    title: "AI-Powered Code Review",
    description: "Instant analysis on bugs, performance, and improvements using Gemini AI.",
  },
  {
    icon: <GitCommitHorizontal className="w-8 h-8 text-blue-600" />,
    title: "Fix & Commit Instantly",
    description: "Apply AI-suggested fixes and commit changes to GitHub directly from IntelliCodeAI.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
    title: "Auto GitHub Repo Analysis",
    description: "Automatically review your code with every GitHub commit using webhooks.",
  },
  {
    icon: <Upload className="w-8 h-8 text-green-600" />,
    title: "Secure File Upload Analysis",
    description: "Upload any file for instant code review — no login required.",
  },
];

const FeatureCard = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface InsightData {
  transcript: string;
  emotions: Record<string, number>;
  analysis: string;
  timestamp: number;
}

const BrainIcon = () => (
  <svg className="w-12 h-12 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1 3-1.2.4-2 1.5-2 2.8 0 1 .5 1.9 1.2 2.5-.7.6-1.2 1.5-1.2 2.5 0 1.8 1.5 3.2 3.3 3.2H12" />
    <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1 3 1.2.4 2 1.5 2 2.8 0 1-.5 1.9-1.2 2.5.7.6 1.2 1.5 1.2 2.5 0 1.8-1.5 3.2-3.3 3.2H12" />
    <path d="M12 2v18" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" />
    <path d="M7 16l4-4 4 4 6-6" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-6 h-6 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-6 h-6 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function Insights() {
  const [data, setData] = useState<InsightData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("svaraInsights");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const topEmotions = data?.emotions
    ? Object.entries(data.emotions)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : [];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <BrainIcon />
        <h1 className="text-2xl font-light text-gray-800 mb-4 mt-6">No conversation data</h1>
        <p className="text-gray-600 mb-8">Start a voice conversation to get insights.</p>
        <button
          onClick={() => navigate("/playground")}
          className="px-6 py-3 bg-[#E07155] text-white rounded-xl hover:bg-[#D65A3F] transition-colors"
        >
          Start Conversation
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-2">Your Insights</h1>
          <p className="text-gray-500 text-sm">
            {new Date(data.timestamp).toLocaleString()}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <SparkleIcon />
            <h2 className="text-xl font-medium text-gray-800">Emotional Analysis</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{data.analysis}</p>
        </div>

        {topEmotions.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <ChartIcon />
              <h2 className="text-xl font-medium text-gray-800">Detected Emotions</h2>
            </div>
            <div className="space-y-4">
              {topEmotions.map(([emotion, score]) => (
                <div key={emotion} className="flex items-center gap-4">
                  <span className="w-32 text-gray-600 capitalize">{emotion}</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#E07155] to-[#E39682] rounded-full"
                    />
                  </div>
                  <span className="w-16 text-right text-gray-500 text-sm">
                    {(score * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <MessageIcon />
            <h2 className="text-xl font-medium text-gray-800">Conversation</h2>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.transcript.split("\n").map((line, i) => {
              const isUser = line.startsWith("User:");
              return (
                <p key={i} className={`text-sm ${isUser ? "text-gray-800 font-medium" : "text-gray-600"}`}>
                  {line}
                </p>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center pt-8">
          <button
            onClick={() => {
              sessionStorage.removeItem("svaraInsights");
              navigate("/playground");
            }}
            className="px-8 py-3 bg-[#E07155] text-white rounded-xl hover:bg-[#D65A3F] transition-colors"
          >
            New Conversation
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Back Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

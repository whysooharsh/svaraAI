import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const MicIcon = () => (
  <svg className="w-8 h-8 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const BrainIcon = () => (
  <svg className="w-8 h-8 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2a4 4 0 0 0-4 4c0 1.1.4 2.1 1 3-1.2.4-2 1.5-2 2.8 0 1 .5 1.9 1.2 2.5-.7.6-1.2 1.5-1.2 2.5 0 1.8 1.5 3.2 3.3 3.2H12" />
    <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.4 2.1-1 3 1.2.4 2 1.5 2 2.8 0 1-.5 1.9-1.2 2.5.7.6 1.2 1.5 1.2 2.5 0 1.8-1.5 3.2-3.3 3.2H12" />
    <path d="M12 2v18" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-8 h-8 text-[#E07155]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

export default function Hero() {
  const scroll = useRef(null);
  const { scrollYProgress } = useScroll({ target: scroll, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const navigate = useNavigate();

  return (
    <>
      <div ref={scroll} className="relative z-10 pt-20 px-6 pb-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light mb-4 mt-12">
            The future of AI-powered
          </h1>
          <span className="block text-3xl md:text-5xl font-light text-gray-800 mb-6">
            emotional intelligence
          </span>
          <p className="text-sm text-gray-600 font-mono max-w-xl mx-auto">
            An emotionally-aware AI that doesn't just talk, but listens. 
            Svara understands your tone, emotion, and provides meaningful insights.
          </p>
        </div>

        <motion.div style={{ scale, y }} className="bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg max-w-5xl mx-auto">
          <div className="relative w-full aspect-video overflow-hidden rounded-xl">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=dlvjrvhak&public_id=cursorful-video-1767724479999_gpbe7r&profile=cld-default"
              className="absolute inset-0 w-full h-full rounded-xl"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      <div className="-mt-20 bg-amber-100 w-full px-6 py-20">
        <div className="text-center mt-10 text-gray-600 font-mono flex items-center justify-center gap-2">
          <ArrowIcon />
          <span>Scroll to explore</span>
        </div>

        <div className="max-w-7xl mx-auto mt-20">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6 max-w-4xl">
              We explore how emotion-aware AI can align with and enhance human well-being
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl">
              <div className="mb-4"><MicIcon /></div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Voice First</h3>
              <p className="text-gray-600 text-sm">
                Speak naturally. Svara listens to not just what you say, but how you say it.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl">
              <div className="mb-4"><BrainIcon /></div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Emotional Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Real-time emotion detection through voice prosody analysis.
              </p>
            </div>
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl">
              <div className="mb-4"><SparkleIcon /></div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Meaningful Insights</h3>
              <p className="text-gray-600 text-sm">
                Get psychological insights about your emotional patterns and state of mind.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/playground")}
              className="px-8 py-4 bg-[#E07155] text-white rounded-full text-lg font-medium hover:bg-[#D65A3F] transition-colors shadow-lg"
            >
              Start Conversation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
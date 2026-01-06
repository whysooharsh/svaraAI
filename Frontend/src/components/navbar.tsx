import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-100 ${
        scrolled ? "backdrop-blur-2xl bg-white/90 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              className="max-h-12 max-w-26"
              src="https://res.cloudinary.com/dpwqggym0/image/upload/v1751012836/wmremove-transformed-removebg-preview_jpl4zz.png"
              alt="SvaraAI logo"
            />
            <span className="text-base font-mono text-black">SvaraAI</span>
          </Link>

          <div className="hidden md:flex items-center">
            <button
              onClick={() => navigate("/playground")}
              className="bg-black text-white px-4 py-2 rounded-full font-sans text-xs uppercase hover:bg-gray-800 transition-colors"
            >
              Start Conversation
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-white z-50 flex flex-col"
            >
              <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    className="max-h-12 max-w-26"
                    src="https://res.cloudinary.com/dpwqggym0/image/upload/v1751012836/wmremove-transformed-removebg-preview_jpl4zz.png"
                    alt="SvaraAI logo"
                  />
                  <span className="text-base font-mono text-black">SvaraAI</span>
                </Link>
                <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
                  <XMarkIcon className="h-6 w-6 text-gray-800" />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <Link to="/playground" onClick={() => setIsOpen(false)}>
                  <button className="bg-black text-white px-8 py-4 rounded-full font-mono text-sm uppercase hover:bg-gray-800 transition-colors">
                    Start Conversation
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

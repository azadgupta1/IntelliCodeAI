import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SparkleButton = ({ children, onClick, disabled, state = "default" }) => {
  const [sparkles, setSparkles] = useState([]);
  const timeoutRef = useRef(null);

  const triggerSparkles = () => {
    const particles = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 40 - 20,
      y: Math.random() * 20 - 10,
    }));
    setSparkles(particles);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setSparkles([]), 600);
  };

  const handleClick = (e) => {
    if (!disabled && state === "default") {
      triggerSparkles();
      onClick?.(e);
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`
          relative inline-flex items-center gap-2 px-6 py-3 rounded-full
          text-sm font-medium tracking-wide
          transition-all duration-200
          ${
            disabled
              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
              : state === "success"
              ? "bg-emerald-600 text-white"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }
          shadow-sm
        `}
      >
        {/* Minimal icon */}
        {state === "success" ? (
          <span className="text-sm">✔</span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
        )}

        <span>{children}</span>
      </button>

      {/* Subtle sparkles */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: s.x, y: s.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-indigo-400"
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SparkleButton;

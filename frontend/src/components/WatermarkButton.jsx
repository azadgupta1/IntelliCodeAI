

// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import SparkImg from "../assets/Sparkle.svg";

// // Basic button component
// const Button = ({ children, className, onClick, ...props }) => {
//     const combinedClasses = `
//     ${className || ''}
//     px-6 py-3 rounded-full font-semibold text-lg
//     bg-black from-black-900 to-black-600
//     text-white
//     hover:from-black-600 hover:to-black-600
//     transition-all duration-300
//     cursor-pointer
//     border-none
//     `;

//     return (
//         <button
//             {...props}
//             className={combinedClasses}
//             onClick={onClick}
//         >
//             {children}
//         </button>
//     );
// };

// // Sparkle-enhanced button
// const SparkleButton = ({ children, onClick, ...props }) => {
//     const [sparkles, setSparkles] = useState([]);
//     const containerRef = useRef(null);

//     const triggerSparkles = () => {
//         const newSparkles = Array.from({ length: 10 }).map((_, index) => ({
//             id: Date.now() + index,
//             y: Math.random() * 40 - 20, // Random vertical offset
//             duration: 1 + Math.random() * 0.5, // Random speed
//         }));
//         setSparkles(newSparkles);

//         // Clear them after animation
//         setTimeout(() => {
//             setSparkles([]);
//         }, 1500);
//     };

//     const handleClick = (e) => {
//         triggerSparkles();
//         if (onClick) onClick(e);
//     };

//     return (
//         <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
//             <Button
//                 {...props}
//                 onClick={handleClick}
//                 className={`relative overflow-hidden ${props.className || ''}`}
//             >
//                 <div className="relative">
//                     <img src={SparkImg} alt="Main Sparkle" style={{ width: 32, height: 32 }} />
//                     <img
//                         src={SparkImg}
//                         alt="Mini Sparkle"
//                         style={{
//                             position: 'absolute',
//                             top: 2,
//                             left: 2,
//                             width: 10,
//                             height: 10,
//                             pointerEvents: 'none'
//                         }}
//                     />
//                 </div>
            

//                 {/* Animated Sparkles */}
//                 <AnimatePresence>
//                     {sparkles.map((sparkle) => (
//                         <motion.img
//                             key={sparkle.id}
//                             src={SparkImg}
//                             initial={{ x: 0, y: 0, opacity: 1 }}
//                             animate={{ x: 200, y: sparkle.y, opacity: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{
//                                 duration: sparkle.duration,
//                                 ease: 'easeOut'
//                             }}
//                             style={{
//                                 position: 'absolute',
//                                 top: '50%',
//                                 left: '0%',
//                                 width: 12,
//                                 height: 12,
//                                 pointerEvents: 'none',
//                                 zIndex: 20,
//                             }}
//                         />
//                     ))}
//                 </AnimatePresence>

//                 <span className="ml-2">{children}</span>
//             </Button>
//         </div>
//     );
// };

// export default SparkleButton;


















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

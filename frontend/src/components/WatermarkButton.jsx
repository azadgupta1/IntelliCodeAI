

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SparkImg from "../assets/Sparkle.svg";

// Basic button component
const Button = ({ children, className, onClick, ...props }) => {
    const combinedClasses = `
    ${className || ''}
    px-6 py-3 rounded-full font-semibold text-lg
    bg-gradient-to-r from-purple-500 to-pink-500
    text-white
    hover:from-purple-600 hover:to-pink-600
    transition-all duration-300
    cursor-pointer
    border-none
    `;

    return (
        <button
            {...props}
            className={combinedClasses}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Sparkle-enhanced button
const SparkleButton = ({ children, onClick, ...props }) => {
    const [sparkles, setSparkles] = useState([]);
    const containerRef = useRef(null);

    const triggerSparkles = () => {
        const newSparkles = Array.from({ length: 10 }).map((_, index) => ({
            id: Date.now() + index,
            y: Math.random() * 40 - 20, // Random vertical offset
            duration: 1 + Math.random() * 0.5, // Random speed
        }));
        setSparkles(newSparkles);

        // Clear them after animation
        setTimeout(() => {
            setSparkles([]);
        }, 1500);
    };

    const handleClick = (e) => {
        triggerSparkles();
        if (onClick) onClick(e);
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
            <Button
                {...props}
                onClick={handleClick}
                className={`relative overflow-hidden ${props.className || ''}`}
            >
                <div className="relative">
                    <img src={SparkImg} alt="Main Sparkle" style={{ width: 32, height: 32 }} />
                    <img
                        src={SparkImg}
                        alt="Mini Sparkle"
                        style={{
                            position: 'absolute',
                            top: 2,
                            left: 2,
                            width: 10,
                            height: 10,
                            pointerEvents: 'none'
                        }}
                    />
                </div>
            

                {/* Animated Sparkles */}
                <AnimatePresence>
                    {sparkles.map((sparkle) => (
                        <motion.img
                            key={sparkle.id}
                            src={SparkImg}
                            initial={{ x: 0, y: 0, opacity: 1 }}
                            animate={{ x: 200, y: sparkle.y, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: sparkle.duration,
                                ease: 'easeOut'
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '0%',
                                width: 12,
                                height: 12,
                                pointerEvents: 'none',
                                zIndex: 20,
                            }}
                        />
                    ))}
                </AnimatePresence>

                <span className="ml-2">{children}</span>
            </Button>
        </div>
    );
};

export default SparkleButton;

// Example usage
// const SparkB = () => {
//     return (
//         <SparkleButton onClick={() => alert('Button Clicked!')}>
//             Click Me!
//         </SparkleButton>
//     );
// };

// export default SparkB;


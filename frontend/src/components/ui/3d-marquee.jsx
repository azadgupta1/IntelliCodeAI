"use client";

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

const IMAGE_SIZE = 560; // 🔥 GIANT IMAGE SIZE (change freely)
const DEPTH_STEP = 220; // 🔥 how fast images disappear into depth

export const ThreeDMarquee = ({ images, className }) => {
  const columns = 3;
  const chunkSize = Math.ceil(images.length / columns);
  const chunks = Array.from({ length: columns }, (_, i) =>
    images.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  return (
    <div
      className={cn(
        "mx-auto h-[920px] w-screen overflow-hidden rounded-2xl flex items-center justify-center bg-transparent",
        className
      )}
      style={{ perspective: "1400px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative flex gap-[180px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(65deg) rotateZ(-45deg)",
          }}
        >
          {chunks.map((colImages, colIndex) => (
            <motion.div
              key={colIndex}
              className="relative flex flex-col gap-[160px]"
              animate={{ y: colIndex % 2 === 0 ? 90 : -90 }}
              transition={{
                duration: 5 + colIndex,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              style={{
                transform: `translateZ(${-DEPTH_STEP * colIndex}px) rotateY(${
                  colIndex * 8
                }deg)`,
              }}
            >
              {colImages.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative"
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                  }}
                >
                  <motion.img
                    src={img}
                    alt={`Image ${imgIndex + 1}`}
                    className="absolute inset-0 rounded-2xl object-cover ring ring-black/20 shadow-2xl"
                    style={{
                      width: IMAGE_SIZE,
                      height: IMAGE_SIZE,
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -20,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

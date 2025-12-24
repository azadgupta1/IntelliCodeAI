// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";
// export const ThreeDMarquee = ({
//   images,
//   className
// }) => {
//   // Split the images array into 4 equal parts
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, colIndex) => {
//     const start = colIndex * chunkSize;
//     return images.slice(start, start + chunkSize);
//   });
//   return (
//     <div
//       className={cn(
//         "mx-auto block h-[600px] overflow-hidden rounded-2xl max-sm:h-100",
//         className
//       )}>
//       <div className="flex size-full items-center justify-center">
//         <div className="size-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
//           <div
//             style={{
//               transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
//             }}
//             className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d">
//             {chunks.map((subarray, colIndex) => (
//               <motion.div
//                 animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
//                 transition={{
//                   duration: colIndex % 2 === 0 ? 10 : 15,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                 }}
//                 key={colIndex + "marquee"}
//                 className="flex flex-col items-start gap-8">
//                 <GridLineVertical className="-left-4" offset="80px" />
//                 {subarray.map((image, imageIndex) => (
//                   <div className="relative" key={imageIndex + image}>
//                     <GridLineHorizontal className="-top-4" offset="20px" />
//                     <motion.img
//                       whileHover={{
//                         y: -10,
//                       }}
//                       transition={{
//                         duration: 0.3,
//                         ease: "easeInOut",
//                       }}
//                       key={imageIndex + image}
//                       src={image}
//                       alt={`Image ${imageIndex + 1}`}
//                       className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
//                       width={970}
//                       height={700} />
//                   </div>
//                 ))}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const GridLineHorizontal = ({
//   className,
//   offset
// }) => {
//   return (
//     <div
//       style={
//         {
//           "--background": "#ffffff",
//           "--color": "rgba(0, 0, 0, 0.2)",
//           "--height": "1px",
//           "--width": "5px",
//           "--fade-stop": "90%",

//           //-100px if you want to keep the line inside
//           "--offset": offset || "200px",

//           "--color-dark": "rgba(255, 255, 255, 0.2)",
//           maskComposite: "exclude"
//         }
//       }
//       className={cn(
//         "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
//         "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
//         "[background-size:var(--width)_var(--height)]",
//         "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
//         "[mask-composite:exclude]",
//         "z-30",
//         "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
//         className
//       )}></div>
//   );
// };

// const GridLineVertical = ({
//   className,
//   offset
// }) => {
//   return (
//     <div
//       style={
//         {
//           "--background": "#ffffff",
//           "--color": "rgba(0, 0, 0, 0.2)",
//           "--height": "5px",
//           "--width": "1px",
//           "--fade-stop": "90%",

//           //-100px if you want to keep the line inside
//           "--offset": offset || "150px",

//           "--color-dark": "rgba(255, 255, 255, 0.2)",
//           maskComposite: "exclude"
//         }
//       }
//       className={cn(
//         "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
//         "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
//         "[background-size:var(--width)_var(--height)]",
//         "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
//         "[mask-composite:exclude]",
//         "z-30",
//         "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
//         className
//       )}></div>
//   );
// };
















// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   // Split images into 4 columns
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[600px] w-full overflow-hidden rounded-2xl max-sm:h-[400px]",
//         className
//       )}
//     >
//       <div className="flex w-full h-full items-center justify-center">
//         <div className="w-[1720px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
//           <div
//             style={{
//               transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
//               transformStyle: "preserve-3d",
//             }}
//             className="relative top-24 right-1/2 grid w-full h-full origin-top-left grid-cols-4 gap-8"
//           >
//             {chunks.map((colImages, colIndex) => (
//               <motion.div
//                 key={`marquee-col-${colIndex}`}
//                 animate={{ y: colIndex % 2 === 0 ? 20 : -20 }}
//                 transition={{
//                   duration: colIndex % 2 === 0 ? 10 : 15,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                 }}
//                 className="flex flex-col items-start gap-8"
//               >
//                 <GridLineVertical className="-left-4" offset="80px" />
//                 {colImages.map((img, imgIndex) => (
//                   <div key={`img-${imgIndex}`} className="relative">
//                     <GridLineHorizontal className="-top-4" offset="20px" />
//                     <motion.img
//                       whileHover={{ y: -10 }}
//                       transition={{ duration: 0.3, ease: "easeInOut" }}
//                       src={img}
//                       alt={`Image ${imgIndex + 1}`}
//                       className="w-[300px] h-[200px] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl"
//                     />
//                   </div>
//                 ))}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Horizontal grid line
// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//     }}
//     className={cn(
//       "absolute left-[calc(var(--offset)/-2)] h-[1px] w-[calc(100%+var(--offset))] bg-black/20 z-30",
//       className
//     )}
//   ></div>
// );

// // Vertical grid line
// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "150px",
//     }}
//     className={cn(
//       "absolute top-[calc(var(--offset)/-2)] h-[calc(100%+var(--offset))] w-[1px] bg-black/20 z-30",
//       className
//     )}
//   ></div>
// );














// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[600px] w-full overflow-hidden rounded-2xl flex items-center justify-center",
//         className
//       )}
//     >
//       <div className="relative w-[1720px] flex justify-center">
//         <div
//           style={{
//             transform: "rotateX(20deg) rotateY(0deg) rotateZ(-20deg)",
//             transformStyle: "preserve-3d",
//           }}
//           className="grid grid-cols-4 gap-6"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={`col-${colIndex}`}
//               animate={{ y: colIndex % 2 === 0 ? 10 : -10 }}
//               transition={{
//                 duration: colIndex % 2 === 0 ? 10 : 15,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6"
//             >
//               {colImages.map((img, imgIndex) => (
//                 <motion.img
//                   key={`img-${imgIndex}`}
//                   src={img}
//                   alt={`Image ${imgIndex + 1}`}
//                   className="w-[300px] h-[200px] object-cover rounded-lg shadow-lg"
//                   whileHover={{ y: -10 }}
//                   transition={{ duration: 0.3, ease: "easeInOut" }}
//                 />
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
















// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   // Split images into 4 columns
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto w-full h-[600px] overflow-hidden rounded-2xl flex items-center justify-center perspective-1000",
//         className
//       )}
//     >
//       <div className="relative w-full max-w-[1720px] flex justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(35deg) rotateY(0deg) rotateZ(-35deg)",
//           }}
//           className="grid grid-cols-4 gap-8"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={`col-${colIndex}`}
//               animate={{ y: colIndex % 2 === 0 ? 40 : -40 }}
//               transition={{
//                 duration: colIndex % 2 === 0 ? 6 : 8, // faster motion
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6"
//               style={{
//                 transform: `translateZ(${colIndex * -50}px)`, // depth effect per column
//               }}
//             >
//               <GridLineVertical className="-left-4" offset="80px" />
//               {colImages.map((img, imgIndex) => (
//                 <div key={`img-${imgIndex}`} className="relative">
//                   <GridLineHorizontal className="-top-4" offset="20px" />
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     className="w-[300px] h-[200px] md:w-[320px] md:h-[220px] object-cover rounded-lg ring ring-gray-950/5 hover:shadow-2xl"
//                     whileHover={{ y: -10, scale: 1.05 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Horizontal Grid Line
// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );

// // Vertical Grid Line
// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "150px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );











































// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[600px] w-full overflow-hidden rounded-2xl flex items-center justify-center perspective-1000",
//         className
//       )}
//     >
//       <div className="relative w-full max-w-[1720px] flex justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(35deg) rotateZ(-35deg)",
//           }}
//           className="relative grid grid-cols-4 gap-8"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={colIndex}
//               animate={{ y: colIndex % 2 === 0 ? 50 : -50 }}
//               transition={{
//                 duration: colIndex % 2 === 0 ? 6 : 8,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6 relative"
//             >
//               <GridLineVertical className="-left-4" offset="80px" />
//               {colImages.map((img, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <GridLineHorizontal className="-top-4" offset="20px" />
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     className="w-[300px] h-[200px] object-cover rounded-lg ring ring-gray-950/5 hover:shadow-2xl"
//                     whileHover={{ y: -10, scale: 1.05 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );

// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "150px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );

















// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[600px] w-full overflow-hidden rounded-2xl flex items-center justify-center",
//         className
//       )}
//       style={{ perspective: "1200px" }} // Strong perspective
//     >
//       <div className="relative w-full max-w-[1720px] flex justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(65deg) rotateZ(-50deg)", // Strong slant
//           }}
//           className="relative grid grid-cols-4 gap-10"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={colIndex}
//               animate={{ y: colIndex % 2 === 0 ? 80 : -80 }} // faster movement
//               transition={{
//                 duration: colIndex % 2 === 0 ? 5 : 6,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6 relative"
//               style={{
//                 transform: `translateZ(${colIndex * -80}px) rotateY(${colIndex * 5}deg)`, // column depth
//               }}
//             >
//               <GridLineVertical className="-left-4" offset="80px" />
//               {colImages.map((img, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <GridLineHorizontal className="-top-4" offset="20px" />
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     className="w-[300px] h-[200px] md:w-[320px] md:h-[220px] object-cover rounded-lg ring ring-gray-950/5 hover:shadow-2xl"
//                     whileHover={{ y: -10, scale: 1.05 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );

// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "150px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );













// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[600px] w-[1200px] overflow-hidden rounded-2xl flex items-center justify-center",
//         className
//       )}
//       style={{ perspective: "1200px" }}
//     >
//       <div className="relative w-full max-w-[1720px] flex justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(65deg) rotateZ(-50deg)",
//           }}
//           className="relative grid grid-cols-4 gap-10"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={colIndex}
//               animate={{ y: colIndex % 2 === 0 ? 80 : -80 }}
//               transition={{
//                 duration: colIndex % 2 === 0 ? 5 : 6,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6 relative"
//               style={{
//                 transform: `translateZ(${colIndex * -80}px) rotateY(${colIndex * 5}deg)`,
//               }}
//             >
//               <GridLineVertical className="-left-4" offset="80px" />
//               {colImages.map((img, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <GridLineHorizontal className="-top-4" offset="20px" />
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     className="w-[350px] h-[250px] md:w-[380px] md:h-[270px] object-cover rounded-lg ring ring-gray-950/5 hover:shadow-2xl"
//                     whileHover={{ y: -10, scale: 1.05 }}
//                     transition={{ duration: 0.3, ease: "easeInOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );

// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "150px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   ></div>
// );













// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 4);
//   const chunks = Array.from({ length: 4 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         // ⬇️ smaller, squarish container
//         "mx-auto h-[620px] w-[620px] overflow-hidden rounded-2xl flex items-center justify-center",
//         className
//       )}
//       style={{ perspective: "1000px" }}
//     >
//       <div className="relative w-full flex justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(60deg) rotateZ(-45deg)",
//           }}
//           // ⬇️ tighter grid spacing
//           className="relative grid grid-cols-3 gap-6"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={colIndex}
//               animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
//               transition={{
//                 duration: colIndex % 2 === 0 ? 4.5 : 5.5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-5 relative"
//               style={{
//                 transform: `translateZ(${colIndex * -70}px) rotateY(${colIndex * 4}deg)`,
//               }}
//             >
//               <GridLineVertical className="-left-3" offset="60px" />

//               {colImages.map((img, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <GridLineHorizontal className="-top-3" offset="16px" />
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     // ⬆️ bigger images
//                     className="w-[480px] h-[480px] object-cover rounded-lg ring ring-gray-950/5"
//                     whileHover={{ y: -8, scale: 1.06 }}
//                     transition={{ duration: 0.25, ease: "easeOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "160px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to right, rgba(0,0,0,0.18), rgba(0,0,0,0.18) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   />
// );

// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "120px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.18) 50%, transparent 0, transparent)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   />
// );













// "use client";

// import { motion } from "motion/react";
// import { cn } from "../../lib/utils";

// export const ThreeDMarquee = ({ images, className }) => {
//   const chunkSize = Math.ceil(images.length / 3);
//   const chunks = Array.from({ length: 3 }, (_, i) =>
//     images.slice(i * chunkSize, i * chunkSize + chunkSize)
//   );

//   return (
//     <div
//       className={cn(
//         "mx-auto h-[620px] w-[620px] overflow-hidden rounded-2xl flex items-center justify-center",
//         className
//       )}
//       style={{ perspective: "1200px" }}
//     >
//       <div className="relative w-full h-full flex items-center justify-center">
//         <div
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateX(62deg) rotateZ(-45deg)",
//           }}
//           className="relative grid grid-cols-3 w-full gap-6 px-6"
//         >
//           {chunks.map((colImages, colIndex) => (
//             <motion.div
//               key={colIndex}
//               animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
//               transition={{
//                 duration: 5 + colIndex,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }}
//               className="flex flex-col gap-6 relative"
//               style={{
//                 transform: `translateZ(${-140 * colIndex}px) rotateY(${
//                   colIndex * 6
//                 }deg)`,
//               }}
//             >
//               <GridLineVertical className="-left-3" offset="80px" />

//               {colImages.map((img, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <GridLineHorizontal className="-top-3" offset="24px" />

//                   {/* 🔑 KEY FIX */}
//                   <motion.img
//                     src={img}
//                     alt={`Image ${imgIndex + 1}`}
//                     className="w-full aspect-square object-cover rounded-xl ring ring-black/10"
//                     whileHover={{ scale: 1.08, y: -10 }}
//                     transition={{ duration: 0.3, ease: "easeOut" }}
//                   />
//                 </div>
//               ))}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ---------------- GRID LINES ---------------- */

// const GridLineHorizontal = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "200px",
//       height: "1px",
//       width: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to right, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 50%, transparent 0)",
//     }}
//     className={cn("absolute left-[calc(var(--offset)/-2)] z-30", className)}
//   />
// );

// const GridLineVertical = ({ className, offset }) => (
//   <div
//     style={{
//       "--offset": offset || "160px",
//       width: "1px",
//       height: "calc(100% + var(--offset))",
//       background:
//         "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 50%, transparent 0)",
//     }}
//     className={cn("absolute top-[calc(var(--offset)/-2)] z-30", className)}
//   />
// );




















































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

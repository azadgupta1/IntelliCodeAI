// const HeroSection = () => {
//     return (
//       <section className="bg-blue-800 text-white text-center py-16">
//         <h1 className="text-4xl font-bold mb-4">🚀 AI-Powered Code Review & Analysis</h1>
//         <p className="text-xl mb-8">Upload code or connect GitHub for instant insights</p>
//         <div className="flex justify-center gap-8">
//           <button className="bg-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-700">
//             ⬆ Upload Code for Analysis
//           </button>
//           <button className="bg-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-700">
//             🔗 Analyze GitHub
//           </button>
//         </div>
//       </section>
//     );
//   };
  
//   export default HeroSection;
  


const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white text-center py-20 px-6">
      <h1 className="text-5xl font-extrabold mb-6 text-indigo-400 drop-shadow-lg animate-fade-in">
        🚀 AI-Powered Code Review & Analysis
      </h1>
      <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
        Upload your code or connect GitHub for instant AI-driven insights & bug fixes.
      </p>
      <div className="flex justify-center gap-8">
        <button className="bg-indigo-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-105">
          ⬆ Upload Code for Analysis
        </button>
        <button className="bg-blue-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105">
          🔗 Analyze GitHub
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

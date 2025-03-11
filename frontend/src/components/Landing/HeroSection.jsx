const HeroSection = () => {
    return (
      <section className="bg-blue-800 text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">🚀 AI-Powered Code Review & Analysis</h1>
        <p className="text-xl mb-8">Upload code or connect GitHub for instant insights</p>
        <div className="flex justify-center gap-8">
          <button className="bg-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-700">
            ⬆ Upload Code for Analysis
          </button>
          <button className="bg-indigo-500 px-6 py-2 rounded-lg hover:bg-indigo-700">
            🔗 Analyze GitHub
          </button>
        </div>
      </section>
    );
  };
  
  export default HeroSection;
  
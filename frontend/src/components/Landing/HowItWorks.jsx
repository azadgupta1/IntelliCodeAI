const HowItWorks = () => {
    return (
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works:</h2>
        <div className="space-y-6">
          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl">1️⃣</span>
            <p className="text-lg">Upload file → AI checks bugs & improvements</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl">2️⃣</span>
            <p className="text-lg">Connect GitHub → Analyze commits automatically</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl">3️⃣</span>
            <p className="text-lg">View AI insights & suggestions</p>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  
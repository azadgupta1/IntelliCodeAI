import PricingCard from "./PricingCard";

const Pricing = () => {
  return (
    <section className="min-h-screen bg-white text-black px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-black">
          Pricing Plans
        </h1>
        <p className="text-gray-400 text-lg mt-3">
          Power up your development workflow with IntelliCodeAI
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="0"
          badge="Most Popular"
          features={[
            "GitHub login & file upload",
            "Manual file analysis",
            "AI-powered bug detection",
            "Fix suggestions & insights",
          ]}
        />

        {/* Pro Plan */}
        <PricingCard
          title="Pro"
          price="49"
          comingSoon
          glassStyle="bg-cyan-600/20 backdrop-blur-lg border border-cyan-400/20 shadow-lg"
          features={[
            "Automatic GitHub webhook analysis",
            "Priority AI suggestions",
            "In-platform code editor",
            "Fix & commit directly to GitHub",
          ]}
        />

        {/* Enterprise Plan */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          comingSoon
          glassStyle="bg-cyan-600/20 backdrop-blur-lg border border-cyan-400/20 shadow-lg"
          features={[
            "Team collaboration",
            "Advanced analytics dashboard",
            "Role-based access control",
            "Dedicated enterprise support",
          ]}
        />
      </div>
    </section>
  );
};

export default Pricing;

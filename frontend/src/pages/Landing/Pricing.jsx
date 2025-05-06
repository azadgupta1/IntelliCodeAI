import PricingCard from "../../components/PricingCard";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-[#00ffd1]">Pricing Plans</h1>
        <p className="text-gray-400 text-lg mt-3">
          Power up your development with IntelliCodeAI
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="0"
          features={[
            "✔ GitHub Login & File Upload",
            "✔ Manual File Analysis",
            "✔ AI Bug Detection",
            "✔ Fix Suggestions",
          ]}
          badge="Most Popular"
        />

        {/* Pro Plan (Coming Soon) */}
        <PricingCard
          title="Pro"
          price="49"
          comingSoon
          glassStyle="bg-cyan-600/20 backdrop-blur-lg border border-cyan-400/20 shadow-lg"
          features={[
            "✔ Auto GitHub Webhook Analysis",
            "✔ Priority AI Suggestions",
            "✔ In-platform Code Editor",
            "✔ Fix & Commit to GitHub",
          ]}
        />

        {/* Enterprise Plan (Coming Soon) */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          comingSoon
          glassStyle="bg-cyan-600/20 backdrop-blur-lg border border-cyan-400/20 shadow-lg"
          features={[
            "✔ Team Collaboration",
            "✔ Analytics Dashboard",
            "✔ Role-based Access",
            "✔ Dedicated Support",
          ]}
        />
      </div>
    </div>
  );
};

export default Pricing;

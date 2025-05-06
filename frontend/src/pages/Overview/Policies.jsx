import React from "react";

const Policies = () => {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📜 IntelliCodeAI Policies</h1>
        <p className="text-gray-400 mb-8 text-center">
          Our commitment to transparency, trust, and responsible AI use.
        </p>

        <div className="space-y-10">
          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
            <p className="text-gray-800">
              We do not store or share your private code without consent. GitHub scopes are limited to read-only access for repositories you choose.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">AI Usage Policy</h2>
            <p className="text-gray-800">
              Our AI systems are designed to assist, not replace developers. IntelliCodeAI does not auto-commit code without your explicit review and approval.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Fair Use</h2>
            <p className="text-gray-800">
              We reserve the right to restrict usage in cases of API abuse, malicious analysis, or actions that compromise platform integrity.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Compliance</h2>
            <p className="text-gray-800">
              IntelliCodeAI is compliant with GDPR standards and works towards maintaining global privacy regulations.
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-gray-500 text-sm">
          For inquiries, reach out to <span className="underline">compliance@intellicodeai.dev</span>
        </p>
      </div>
    </div>
  );
};

export default Policies;

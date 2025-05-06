import React from "react";

const Security = () => {
  return (
    <div className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🔐 Security at IntelliCodeAI</h1>
        <p className="text-gray-800 mb-8 text-center">
          Protecting your code, data, and privacy is our top priority. Here's how we ensure it.
        </p>

        <div className="grid gap-10 md:grid-cols-2">
          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Data Encryption</h2>
            <p className="text-gray-800">
              All user data, including GitHub tokens and uploaded files, are encrypted both in transit (TLS 1.2+) and at rest using AES-256.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">OAuth & Authentication</h2>
            <p className="text-gray-800">
              We use GitHub OAuth 2.0 to authenticate users securely. No passwords are stored or processed by IntelliCodeAI.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Secure Code Execution</h2>
            <p className="text-gray-800">
              All AI-based analysis runs in isolated, containerized environments to prevent any unauthorized access or execution.
            </p>
          </section>

          <section className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Audit Logging</h2>
            <p className="text-gray-800">
              Every sensitive action is logged for transparency, including commits, file uploads, and analysis events.
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-gray-500 text-sm">
          For security reports or inquiries, contact us at <span className="underline">security@intellicodeai.dev</span>
        </p>
      </div>
    </div>
  );
};

export default Security;

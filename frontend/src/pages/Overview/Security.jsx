import React from "react";
import { ShieldCheck, Lock, Eye, Server, FileCheck, AlertTriangle } from "lucide-react";

export default function Security() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white m-10">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Security at IntelliCodeAI</h1>
          <p className="text-lg text-slate-300 max-w-3xl">
            Protecting your code, data, and intellectual property is a core priority at IntelliCodeAI.
            Our platform is built with security-first principles at every layer.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Security Philosophy</h2>
            <p className="text-slate-600 leading-relaxed">
              IntelliCodeAI follows industry best practices to ensure confidentiality, integrity,
              and availability of your data. From secure infrastructure to strict access controls,
              every component is designed to minimize risk and maximize trust.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <ShieldCheck className="text-emerald-600 mt-1" />
                <span>Security-by-design architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="text-emerald-600 mt-1" />
                <span>Strong encryption standards</span>
              </li>
              <li className="flex items-start gap-3">
                <Eye className="text-emerald-600 mt-1" />
                <span>Transparent data handling practices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-12 text-center">Platform Security Measures</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature
              icon={<Lock />}
              title="Data Encryption"
              description="All data is encrypted in transit using HTTPS/TLS. Sensitive information is protected using modern encryption standards."
            />
            <Feature
              icon={<Server />}
              title="Secure Infrastructure"
              description="Our services run on hardened environments with restricted network access and continuous monitoring."
            />
            <Feature
              icon={<FileCheck />}
              title="Code Privacy"
              description="Uploaded source code is used only for analysis and is never shared or reused for training without consent."
            />
            <Feature
              icon={<Eye />}
              title="Access Control"
              description="Strict authentication and authorization mechanisms ensure only you can access your projects and reports."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Regular Reviews"
              description="We continuously review our systems and dependencies to reduce vulnerabilities and improve resilience."
            />
            <Feature
              icon={<AlertTriangle />}
              title="Responsible Disclosure"
              description="We encourage responsible security reporting and act quickly on verified vulnerabilities."
            />
          </div>
        </div>
      </section>

      {/* Compliance & Trust */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-6">Compliance & Trust</h2>
        <p className="text-slate-600 max-w-4xl leading-relaxed">
          IntelliCodeAI aligns with widely accepted security and privacy principles. While our
          platform continues to evolve, we are committed to meeting enterprise expectations
          around data protection, confidentiality, and responsible AI usage.
        </p>
      </section>

      {/* Footer CTA */}
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Have a security question?</h3>
          <p className="text-slate-300 mb-6">
            Reach out to our team for security-related inquiries or vulnerability reports.
          </p>
          <a
            href="mailto:security@intellicodeai.com"
            className="inline-block px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition font-medium"
          >
            Contact Security Team
          </a>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 hover:shadow transition">
      <div className="text-emerald-600 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

import React from "react";
import {
  FileText,
  Shield,
  Eye,
  Database,
  RefreshCcw,
  Mail,
} from "lucide-react";

export default function Policies() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Bar */}
      <div className="bg-slate-900 text-white m-5">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">Policies & Governance</h1>
          <p className="text-slate-300 max-w-4xl">
            IntelliCodeAI policies define how we handle data, security, AI responsibility,
            and acceptable use to ensure trust, compliance, and transparency.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border p-6">
            <h3 className="font-semibold mb-4">Policy Scope</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2">
                <FileText size={16} /> Platform usage
              </li>
              <li className="flex gap-2">
                <Database size={16} /> Data handling
              </li>
              <li className="flex gap-2">
                <Shield size={16} /> Security controls
              </li>
              <li className="flex gap-2">
                <Eye size={16} /> Responsible AI
              </li>
              <li className="flex gap-2">
                <RefreshCcw size={16} /> Policy updates
              </li>
            </ul>
          </div>
        </aside>

        {/* Policy Content */}
        <main className="lg:col-span-3 space-y-12">
          <PolicySection
            icon={<Database />}
            title="Data Usage Policy"
            text="All source code, configuration files, and metadata submitted to IntelliCodeAI
            are processed strictly to generate analysis insights. User data is never sold,
            shared, or repurposed for advertising or unauthorized model training."
          />

          <PolicySection
            icon={<Eye />}
            title="Privacy Policy"
            text="We collect only essential information required for authentication, billing,
            and platform functionality. Personal data is handled in accordance with
            applicable privacy standards and internal access controls."
          />

          <PolicySection
            icon={<Shield />}
            title="Security Policy"
            text="IntelliCodeAI enforces layered security controls including encryption,
            access restrictions, monitoring, and periodic system reviews to protect
            platform integrity and customer data."
          />

          <PolicySection
            icon={<FileText />}
            title="Acceptable Use Policy"
            text="Users must not engage in illegal activities, upload malicious code,
            attempt to exploit platform vulnerabilities, or misuse analysis outputs
            in harmful or deceptive ways."
          />

          <PolicySection
            icon={<RefreshCcw />}
            title="Data Retention & Deletion"
            text="Data is retained only for the duration necessary to deliver services,
            meet compliance obligations, or improve platform reliability. Users may
            request deletion subject to applicable requirements."
          />

          <PolicySection
            icon={<Shield />}
            title="Responsible AI Policy"
            text="Our AI systems are designed to assist developers—not replace human judgment.
            We actively evaluate outputs to reduce bias, misuse, and unintended behavior."
          />
        </main>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600 max-w-xl">
            Questions regarding policy interpretation, compliance, or legal matters?
          </p>
          <a
            href="mailto:policy@intellicodeai.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            <Mail size={18} />
            Contact Policy Team
          </a>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl border p-8">
      <div className="flex items-center gap-3 mb-4 text-emerald-600">
        {icon}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
}

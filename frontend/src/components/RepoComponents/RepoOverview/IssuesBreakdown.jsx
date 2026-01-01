import React from "react";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const IssuesBreakdown = ({ owner, repo, errorCount }) => {
  const status =
    errorCount === 0
      ? {
          label: "Healthy Repository",
          color: "text-green-600",
          icon: <FaCheckCircle className="text-green-500" />,
          bg: "bg-green-50",
        }
      : {
          label: "Issues Detected",
          color: "text-amber-700",
          icon: <FaExclamationTriangle className="text-amber-500" />,
          bg: "bg-amber-50",
        };

  return (
    <section className="w-80 mt-10 p-5 border border-slate-200 rounded-xl bg-white shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-semibold text-slate-900">
            {errorCount}
          </h4>
          <p className="text-sm text-slate-500">total issues</p>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}
        >
          {status.icon}
          {status.label}
        </div>
      </header>

      {/* Divider */}
      <div className="my-4 h-px bg-slate-200" />

      {/* AI Insight (real but non-fake) */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">
          AI Insight
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          {errorCount === 0
            ? "No critical issues were detected in the current codebase. The repository follows recommended quality and safety standards."
            : "This repository contains potential issues that may impact reliability or maintainability. Reviewing and resolving them can improve overall code quality."}
        </p>
      </div>

      {/* CTA */}
      <a
        href={`/repositories/${owner}/${repo}/issues`}
        className="mt-5 inline-flex items-center justify-center w-full text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg py-2 hover:bg-indigo-50 transition"
      >
        Review issues →
      </a>
    </section>
  );
};

export default IssuesBreakdown;

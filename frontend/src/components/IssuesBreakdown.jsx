// import React from "react";

// const issues = [
//   { category: "Code style", count: 14, href: "/gh/azadgupta1/Blogger/issues?categories=CodeStyle" },
//   { category: "Error prone", count: 14, href: "/gh/azadgupta1/Blogger/issues?categories=ErrorProne" },
//   { category: "Security", count: 10, href: "/gh/azadgupta1/Blogger/issues?categories=Security" },
//   { category: "Best practice", count: 2, href: "/gh/azadgupta1/Blogger/issues?categories=BestPractice" },
//   { category: "Code complexity", count: 1, href: "/gh/azadgupta1/Blogger/issues?categories=Complexity" },
// ];

// const totalIssues = issues.reduce((sum, issue) => sum + issue.count, 0);

// const IssuesBreakdown = ({owner, repo}) => {
//   return (
//     <section id="chart-issues-breakdown" className="w-82 h-100 mt-10 p-4 bg-white shadow-lg rounded-lg space-y-3">
//       <header className="flex items-baseline gap-2">
//         <h4 className="text-2xl font-semibold">{totalIssues}</h4>
//         <p className="text-sm text-gray-500">total issues</p>
//       </header>

//       <div className="flex justify-between text-xs font-semibold border-b pb-2">
//         <h5 className="text-gray-700">Category</h5>
//         <p className="text-gray-700">Total</p>
//       </div>

//       <div className="space-y-2">
//         {issues.map((issue, index) => (
//           <a
//             key={index}
//             href={issue.href}
//             className="flex items-center justify-between py-2 hover:bg-gray-50 transition rounded px-2"
//           >
//             <div className="flex items-center gap-3">
//               <p className="text-sm text-gray-700">{issue.category}</p>
//               <div className="w-24 h-2 bg-gray-200 rounded">
//                 <div
//                   className="h-2 bg-blue-500 rounded"
//                   style={{ width: `${(issue.count / totalIssues) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 font-medium">{issue.count}</p>
//           </a>
//         ))}
//       </div>

//       <a
//         href={`/repositories/${owner}/${repo}/issues`}
//         className="block text-blue-600 text-xs font-medium mt-4 hover:underline"
//       >
//         See all issues
//       </a>
//     </section>
//   );
// };

// export default IssuesBreakdown;






















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

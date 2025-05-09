import React from "react";

const issues = [
  { category: "Code style", count: 14, href: "/gh/azadgupta1/Blogger/issues?categories=CodeStyle" },
  { category: "Error prone", count: 14, href: "/gh/azadgupta1/Blogger/issues?categories=ErrorProne" },
  { category: "Security", count: 10, href: "/gh/azadgupta1/Blogger/issues?categories=Security" },
  { category: "Best practice", count: 2, href: "/gh/azadgupta1/Blogger/issues?categories=BestPractice" },
  { category: "Code complexity", count: 1, href: "/gh/azadgupta1/Blogger/issues?categories=Complexity" },
];

const totalIssues = issues.reduce((sum, issue) => sum + issue.count, 0);

const IssuesBreakdown = () => {
  return (
    <section id="chart-issues-breakdown" className="w-82 h-100 mt-10 p-4 bg-white shadow-lg rounded-lg space-y-3">
      <header className="flex items-baseline gap-2">
        <h4 className="text-2xl font-semibold">{totalIssues}</h4>
        <p className="text-sm text-gray-500">total issues</p>
      </header>

      <div className="flex justify-between text-xs font-semibold border-b pb-2">
        <h5 className="text-gray-700">Category</h5>
        <p className="text-gray-700">Total</p>
      </div>

      <div className="space-y-2">
        {issues.map((issue, index) => (
          <a
            key={index}
            href={issue.href}
            className="flex items-center justify-between py-2 hover:bg-gray-50 transition rounded px-2"
          >
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-700">{issue.category}</p>
              <div className="w-24 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-blue-500 rounded"
                  style={{ width: `${(issue.count / totalIssues) * 100}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">{issue.count}</p>
          </a>
        ))}
      </div>

      <a
        href="/repositories/azadgupta1/Blogger/issues"
        className="block text-blue-600 text-xs font-medium mt-4 hover:underline"
      >
        See all issues
      </a>
    </section>
  );
};

export default IssuesBreakdown;

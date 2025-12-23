import React from "react";

const testimonials = [
  {
    quote: "A must-have for modern development teams",
    content:
      "IntelliCodeAI has changed the way we review code. Automated detection of bugs, security issues, and poor patterns has significantly reduced review time while improving overall code quality.",
    name: "Rene S.",
    role: "Senior Backend Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    quote: "Game-changer for code quality and productivity",
    content:
      "Our team uses IntelliCodeAI daily to catch hardcoded values, performance issues, and redundancies. The AI suggestions are actionable and easy to understand, even for junior developers.",
    name: "Sam K.",
    role: "Technical Lead",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    stars: 5,
  },
  {
    quote: "Security insights we can trust",
    content:
      "As a company handling sensitive user data, automated security analysis is critical. IntelliCodeAI helps us detect vulnerabilities early and ensures our code meets internal standards before deployment.",
    name: "Jacob D.",
    role: "Platform Architect",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    stars: 4,
  },
  {
    quote: "Smooth integration into our workflow",
    content:
      "The pull request analysis and centralized quality metrics make IntelliCodeAI easy to adopt across teams. It saves hours in manual reviews and lets developers focus on building features.",
    name: "Smith P.",
    role: "Engineering Manager",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Centered Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600">
            Trusted by developers
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Teams rely on IntelliCodeAI to ship better code
          </h2>
          <p className="mt-4 text-lg font-medium text-gray-600">
            Engineering teams use IntelliCodeAI to improve code quality,
            strengthen security, and maintain high standards without slowing
            down development.
          </p>
        </div>

        {/* Horizontal scrolling cards */}
        <div className="mt-16 overflow-hidden">
          <div className="flex w-max animate-marquee gap-8 pr-10">
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="w-[380px] rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span key={i} className="text-orange-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-base font-semibold text-gray-900">
                  “{item.quote}”
                </p>

                <p className="mt-4 text-base font-medium leading-relaxed text-gray-600">
                  {item.content}
                </p>

                {/* Profile */}
                <div className="mt-6 flex items-center gap-4 border-t pt-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

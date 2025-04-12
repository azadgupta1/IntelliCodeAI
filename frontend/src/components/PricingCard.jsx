// // src/components/PricingCard.jsx
// const PricingCard = ({ title, price, features, comingSoon }) => {
//     return (
//       <div
//         className={`border ${
//           comingSoon ? "border-gray-700 opacity-60" : "border-[#00ffd1]"
//         } rounded-xl p-6 w-full max-w-sm bg-[#111] text-white shadow-md`}
//       >
//         <h2 className="text-2xl font-bold mb-2">{title}</h2>
//         <p className="text-xl text-[#00ffd1] font-semibold mb-4">
//           {comingSoon ? "Coming Soon" : `$${price}`}
//         </p>
//         <ul className="text-sm space-y-2 mb-6">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-start space-x-2">
//               <span>•</span>
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//         {!comingSoon && (
//           <button className="w-full bg-[#00ffd1] text-black font-semibold py-2 rounded-md hover:bg-[#00e6b8] transition">
//             Get Started
//           </button>
//         )}
//       </div>
//     );
//   };
  
//   export default PricingCard;
  

const PricingCard = ({ title, price, features, comingSoon = false, glassStyle = "", badge }) => {
    return (
      <div
        className={`w-80 p-6 rounded-xl text-white relative transition-transform transform hover:scale-105 ${
          comingSoon
            ? `${glassStyle}`
            : "bg-[#121212] border border-gray-700 shadow-xl"
        }`}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute -top-3 right-4 bg-[#00ffd1] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {badge}
          </div>
        )}
  
        <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
        <p className="text-center text-4xl font-extrabold text-[#00ffd1] mb-4">
          {price === "0" ? "Free" : price === "Custom" ? "Custom" : `$${price}`}
        </p>
  
        <ul className="space-y-3 mb-6 text-sm text-gray-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature}
            </li>
          ))}
        </ul>
  
        {comingSoon && (
          <div className="text-center text-cyan-300 font-semibold">
            🚧 Coming Soon
          </div>
        )}
      </div>
    );
  };
  
  export default PricingCard;
  
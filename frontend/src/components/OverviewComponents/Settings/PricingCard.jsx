// const PricingCard = ({ title, price, features, comingSoon = false, glassStyle = "", badge }) => {
//     return (
//       <div
//         className={`w-80 p-6 rounded-xl text-white relative transition-transform transform hover:scale-105 ${
//           comingSoon
//             ? `${glassStyle}`
//             : "bg-[#121212] border border-gray-700 shadow-xl"
//         }`}
//       >
//         {/* Badge */}
//         {badge && (
//           <div className="absolute -top-3 right-4 bg-[#00ffd1] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//             {badge}
//           </div>
//         )}
  
//         <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
//         <p className="text-center text-4xl font-extrabold text-[#00ffd1] mb-4">
//           {price === "0" ? "Free" : price === "Custom" ? "Custom" : `$${price}`}
//         </p>
  
//         <ul className="space-y-3 mb-6 text-sm text-gray-300">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-center gap-2">
//               {feature}
//             </li>
//           ))}
//         </ul>
  
//         {comingSoon && (
//           <div className="text-center text-cyan-300 font-semibold">
//             🚧 Coming Soon
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default PricingCard;
  













const PricingCard = ({
  title,
  price,
  features = [],
  comingSoon = false,
  glassStyle = "",
  badge,
}) => {
  const displayPrice =
    price === "0" ? "Free" : price === "Custom" ? "Custom" : `$${price}`;

  return (
    <div
      className={`w-80 p-6 rounded-xl relative transition-transform duration-300 hover:scale-105 ${
        comingSoon
          ? glassStyle
          : "bg-[#111111] border border-white/10 shadow-lg"
      }`}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute -top-3 right-4 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}

      {/* Title */}
      <h2 className="text-2xl font-semibold text-center text-white mb-2">
        {title}
      </h2>

      {/* Price */}
      <p className="text-center text-4xl font-extrabold text-white mb-6">
        {displayPrice}
      </p>

      {/* Features */}
      <ul className="space-y-3 mb-6 text-sm text-gray-400">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-white/80">✔</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Coming Soon */}
      {comingSoon && (
        <div className="text-center text-white/60 font-medium text-sm">
          Coming Soon
        </div>
      )}
    </div>
  );
};

export default PricingCard;

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white py-8">
//       <div className="flex justify-center gap-8">
//         <a href="#docs" className="hover:text-indigo-400">📘 Docs</a>
//         <a href="#contact" className="hover:text-indigo-400">💬 Contact</a>
//         <a href="#github" className="hover:text-indigo-400">🔗 GitHub</a>
//         <a href="#privacy" className="hover:text-indigo-400">🏛 Privacy</a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800">
      <div className="flex justify-center gap-12 text-lg">
        {["Docs", "Contact", "GitHub", "Privacy"].map((item, index) => (
          <a key={index} href="#" className="hover:text-indigo-400 transition">
            {item}
          </a>
        ))}
      </div>
      <p className="text-center text-gray-500 mt-6">&copy; {new Date().getFullYear()} IntelliCodeAI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

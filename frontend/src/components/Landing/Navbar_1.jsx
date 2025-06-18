import { Link as LinkScroll } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NewIA from '../../assets/NewIA.png';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const loginpage = () =>{
    navigate('/loginpage');
  }

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10); // lower threshold for testing
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ title }) => (
    <LinkScroll
      onClick={() => setIsOpen(false)}
      to={title}
      offset={-100}
      spy={true}
      smooth={true}
      activeClass="text-[#C8EA80]"
      className="font-bold text-[#EAEDFF] uppercase transition-colors duration-500 cursor-pointer hover:text-[#2EF2FF] max-lg:my-4 max-lg:text-lg"
    >
      {title}
    </LinkScroll>
  );

  return (
    <header
  className={clsx(
    "fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out",
    hasScrolled
      ? "py-0 bg-[#080D27]/80 backdrop-blur-md"
      : "py-1 bg-[#080D27]/0" // Less initial vertical padding
  )}
>
  <div
    className={clsx(
      "mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex items-center transition-all duration-500 ease-in-out",
      hasScrolled ? "min-h-[56px]" : "min-h-[72px]" // Noticeable difference
    )}
  >


        {/* Logo for small screens */}
        <a className="lg:hidden flex-1 cursor-pointer z-20">
          <img
            src={NewIA}
            alt="logo"
            className={clsx(
              "transition-all duration-500 ease-in-out",
              hasScrolled ? "w-[55px] h-[55px]" : "w-[80px] h-[80px]"
            )}
          />
        </a>

        {/* Navigation */}
        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-[#1E293B] max-lg:opacity-0 max-lg:transition-opacity max-lg:duration-500",
            isOpen
              ? "max-lg:opacity-100 max-lg:pointer-events-auto"
              : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden max-md:px-4">
            {/* Blurred background circle */}
            <div
              style={{
                position: 'absolute',
                right: '-16rem',
                top: '40%',
                height: '440px',
                width: '252px',
                backgroundColor: '#3C52D9',
                filter: 'blur(200px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <nav className="max-lg:relative max-lg:z-20 max-lg:my-auto space-x-0">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
                  <NavLink title="features" />
                  <li><Link to="/uploadfile" className="text-white font-bold">UPLOAD FILE</Link></li>
                  <NavLink title="pricing" />
                </li>

                <li className="relative flex flex-1 items-center justify-center">
                  <LinkScroll
                    to="hero"
                    offset={-250}
                    spy={true}
                    smooth={true}
                    className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                  >
                    <img
                      src={NewIA}
                      alt="logo"
                      className={clsx(
                        "transition-all duration-500 ease-in-out",
                        hasScrolled ? "w-[85px] h-[85px]" : "w-[120px] h-[120px]"
                      )}
                    />
                  </LinkScroll>
                </li>



                <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
                  <NavLink title="download" />
                  <div className="hidden max-lg:block h-6 w-6 rounded-full bg-[#3C52D9]" />
                  <li className="flex space-x-12">
                    <li><button onClick={loginpage} className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200">Login</button></li>
                    <li><button onClick={() => navigate("/signup")} className="bg-white text-black px-4 py-2 rounded-full hover:bg-[#9384e6]">Start Free</button></li>
                  </li>
                </li>
              </ul>
            </nav>

            {/* Decorative background outlines */}
            <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] -translate-x-[290px] -translate-y-1/2 rotate-90">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-20"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 mix-blend-soft-light opacity-5"
              />
            </div>
          </div>
        </div>

        {/* Hamburger toggle button */}
        <button
          className="lg:hidden z-20 w-10 h-10 border-2 border-[#3C52D9]/25 rounded-full flex justify-center items-center"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="menu toggle"
            className="w-5 h-5 object-contain"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;


// import { Link as LinkScroll } from "react-scroll";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import NewIA from "../../assets/NewIA.png";

// const Header = () => {
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const loginpage = () => navigate("/loginpage");

//   useEffect(() => {
//     const handleScroll = () => setHasScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const NavLink = ({ title }) => (
//     <LinkScroll
//       to={title}
//       smooth={true}
//       spy={true}
//       offset={-100}
//       onClick={() => setIsOpen(false)}
//       activeClass="text-[#C8EA80]"
//       className="font-bold text-[#EAEDFF] uppercase transition-colors duration-500 cursor-pointer hover:text-[#2EF2FF] mx-4 max-lg:my-4 max-lg:text-lg"
//     >
//       {title}
//     </LinkScroll>
//   );

//   return (
//     <header
//       className={clsx(
//         "fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out",
//         hasScrolled ? "py-0 bg-[#080D27]/80 backdrop-blur-md" : "py-1 bg-[#080D27]"
//       )}
//     >
//       <div
//         className={clsx(
//           "mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex items-center justify-between transition-all duration-500 ease-in-out",
//           hasScrolled ? "min-h-[56px]" : "min-h-[72px]"
//         )}
//       >
//         {/* Logo - Small screen */}
//         <a className="lg:hidden flex-1 cursor-pointer z-20">
//           <img
//             src={NewIA}
//             alt="logo"
//             className={clsx(
//               "transition-all duration-500 ease-in-out",
//               hasScrolled ? "w-[55px] h-[55px]" : "w-[80px] h-[80px]"
//             )}
//           />
//         </a>

//         {/* Navigation Section */}
//         <div
//           className={clsx(
//             "w-full flex-1 flex items-center justify-center max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-[#1E293B] max-lg:opacity-0 max-lg:transition-opacity max-lg:duration-500",
//             isOpen ? "max-lg:opacity-100 max-lg:pointer-events-auto" : "max-lg:pointer-events-none"
//           )}
//         >
//           <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-md:px-4 w-full">
//             {/* Blurred Background */}
//             <div
//               style={{
//                 position: "absolute",
//                 right: "-16rem",
//                 top: "40%",
//                 height: "440px",
//                 width: "252px",
//                 backgroundColor: "#3C52D9",
//                 filter: "blur(200px)",
//                 zIndex: 0,
//                 pointerEvents: "none",
//               }}
//             />

//             {/* Nav Links */}
//             <nav className="max-lg:relative max-lg:z-20 w-full">
//               <ul className="flex items-center justify-center w-full max-lg:flex-col max-lg:items-start max-lg:px-12 gap-x-8">
//                 <NavLink title="features" />
//                 <li className="mx-4">
//                   <Link to="/uploadfile" className="text-white font-bold hover:text-[#2EF2FF] transition-colors">
//                     Upload File
//                   </Link>
//                 </li>
//                 <NavLink title="pricing" />

//                 {/* Center Logo (Desktop Only) */}
//                 <li className="mx-6 hidden lg:block">
//                   <LinkScroll
//                     to="hero"
//                     offset={-250}
//                     spy={true}
//                     smooth={true}
//                     className="transition-transform duration-500 cursor-pointer"
//                   >
//                     <img
//                       src={NewIA}
//                       alt="logo"
//                       className={clsx(
//                         "transition-all duration-500 ease-in-out",
//                         hasScrolled ? "w-[85px] h-[85px]" : "w-[120px] h-[120px]"
//                       )}
//                     />
//                   </LinkScroll>
//                 </li>

//                 <NavLink title="download" />
//               </ul>

//               {/* Mobile Buttons */}
//               <div className="lg:hidden mt-6 w-full flex flex-col gap-4 px-4">
//                 <button
//                   onClick={loginpage}
//                   className="bg-white text-[#080D27] font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => navigate("/signup")}
//                   className="bg-[#C8EA80] text-[#080D27] font-semibold px-6 py-2 rounded-full hover:bg-[#b3dc6c] transition"
//                 >
//                   Start Free
//                 </button>
//               </div>
//             </nav>

//             {/* Background outlines */}
//             <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] -translate-x-[290px] -translate-y-1/2 rotate-90">
//               <img
//                 src="/images/bg-outlines.svg"
//                 width={960}
//                 height={380}
//                 alt="outline"
//                 className="relative z-20"
//               />
//               <img
//                 src="/images/bg-outlines-fill.png"
//                 width={960}
//                 height={380}
//                 alt="outline"
//                 className="absolute inset-0 mix-blend-soft-light opacity-5"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden lg:flex items-center space-x-4 z-20">
//           <button
//             onClick={loginpage}
//             className="bg-white text-[#080D27] font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate("/signup")}
//             className="bg-[#C8EA80] text-[#080D27] font-semibold px-4 py-2 rounded-full hover:bg-[#b3dc6c] transition"
//           >
//             Start Free
//           </button>
//         </div>

//         {/* Toggle Button */}
//         <button
//           className="lg:hidden z-20 w-10 h-10 border-2 border-[#3C52D9]/25 rounded-full flex justify-center items-center"
//           onClick={() => setIsOpen((prev) => !prev)}
//           aria-label="Toggle menu"
//         >
//           <img
//             src={`/images/${isOpen ? "close" : "magic"}.svg`}
//             alt="menu toggle"
//             className="w-5 h-5 object-contain"
//           />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

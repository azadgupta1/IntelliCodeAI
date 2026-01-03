// import { Link as LinkScroll } from "react-scroll";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import NewIA from '../../assets/NewIA.png';

// const Header = () => {
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();


//   const loginpage = () =>{
//     navigate('/login');
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setHasScrolled(window.scrollY > 10); // lower threshold for testing
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const NavLink = ({ title }) => (
//     <LinkScroll
//       onClick={() => setIsOpen(false)}
//       to={title}
//       offset={-100}
//       spy={true}
//       smooth={true}
//       activeClass="text-[#C8EA80]"
//       className="font-bold text-[#EAEDFF] uppercase transition-colors duration-500 cursor-pointer hover:text-[#2EF2FF] max-lg:my-4 max-lg:text-lg"
//     >
//       {title}
//     </LinkScroll>
//   );

//   return (
//     <header
//   className={clsx(
//     "fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out",
//     hasScrolled
//       ? "py-0 bg-[#080D27]/80 backdrop-blur-md"
//       : "py-1 bg-[#080D27]/0" // Less initial vertical padding
//   )}
// >
//   <div
//     className={clsx(
//       "mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex items-center transition-all duration-500 ease-in-out",
//       hasScrolled ? "min-h-[56px]" : "min-h-[72px]" // Noticeable difference
//     )}
//   >


//         {/* Logo for small screens */}
//         <a className="lg:hidden flex-1 cursor-pointer z-20">
//           <img
//             src={NewIA}
//             alt="logo"
//             className={clsx(
//               "transition-all duration-500 ease-in-out",
//               hasScrolled ? "w-[55px] h-[55px]" : "w-[75px] h-[75px]"
//             )}
//           />
//         </a>

//         {/* Navigation */}
//         <div
//           className={clsx(
//             "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-[#1E293B] max-lg:opacity-0 max-lg:transition-opacity max-lg:duration-500",
//             isOpen
//               ? "max-lg:opacity-100 max-lg:pointer-events-auto"
//               : "max-lg:pointer-events-none"
//           )}
//         >
//           <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden max-md:px-4">
//             {/* Blurred background circle */}
            
//             <nav className="max-lg:relative max-lg:z-20 max-lg:my-auto space-x-0">
//               <ul className="flex max-lg:block max-lg:px-12">
//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="features" />
//                   <li><Link to="/uploadfile" className="text-white font-bold">UPLOAD FILE</Link></li>
//                   <NavLink title="pricing" />
//                 </li>

//                 <li className="relative flex flex-1 items-center justify-center">
//                   <LinkScroll
//                     to="hero"
//                     offset={-250}
//                     spy={true}
//                     smooth={true}
//                     className="max-lg:hidden transition-transform duration-500 cursor-pointer"
//                   >
//                     <img
//                       src={NewIA}
//                       alt="logo"
//                       className={clsx(
//                         "transition-all duration-500 ease-in-out",
//                         hasScrolled ? "w-[85px] h-[85px]" : "w-[110px] h-[110px]"
//                       )}
//                     />
//                   </LinkScroll>
//                 </li>



//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="download" />
//                   <div className="hidden max-lg:block h-6 w-6 rounded-full bg-[#3C52D9]" />
//                   <li className="flex space-x-12">
//                     <li><button onClick={loginpage} className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-200">Login</button></li>
//                     <li><button onClick={() => navigate("/signup")} className="bg-white text-black px-4 py-2 rounded-full hover:bg-[#9384e6]">Start Free</button></li>
//                   </li>
//                 </li>
//               </ul>
//             </nav>

//             {/* Decorative background outlines */}
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

//         {/* Hamburger toggle button */}
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









import { Link as LinkScroll } from "react-scroll";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import clsx from "clsx";
import NewIA from "../../assets/NewIA.png";

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const loginpage = () => {
    navigate("/login");
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
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
      className="font-bold text-[#EAEDFF] uppercase transition-colors duration-300 cursor-pointer hover:text-[#2EF2FF] max-lg:my-4 max-lg:text-lg"
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
          : "py-1 bg-[#080D27]/0"
      )}
    >
      <div
        className={clsx(
          "mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex items-center justify-between transition-all duration-500",
          hasScrolled ? "min-h-[56px]" : "min-h-[72px]"
        )}
      >
        {/* Mobile Logo */}
        <div className="lg:hidden flex-1 z-20">
          <img
            src={NewIA}
            alt="logo"
            className={clsx(
              "transition-all duration-500",
              hasScrolled ? "w-[55px] h-[55px]" : "w-[75px] h-[75px]"
            )}
          />
        </div>

        {/* Navigation */}
        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:inset-0 max-lg:bg-[#080D27] max-lg:transition-all max-lg:duration-500",
            isOpen
              ? "max-lg:opacity-100 max-lg:visible"
              : "max-lg:opacity-0 max-lg:invisible"
          )}
        >
          <div className="max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:min-h-screen max-lg:px-6">
            <nav>
              <ul className="flex items-center justify-between max-lg:flex-col max-lg:space-y-6">

                {/* Left */}
                <li className="flex items-center space-x-10 max-lg:flex-col max-lg:space-x-0">
                  <NavLink title="features" />
                  <Link
                    to="/uploadfile"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-white uppercase hover:text-[#2EF2FF]"
                  >
                    Upload File
                  </Link>
                  <NavLink title="pricing" />
                </li>

                
                {/* <li className="max-lg:hidden">
                  <LinkScroll to="hero" offset={-250} smooth>
                    <img
                      src={NewIA}
                      alt="logo"
                      className={clsx(
                        "transition-all duration-500",
                        hasScrolled
                          ? "w-[85px] h-[85px]"
                          : "w-[110px] h-[110px]"
                      )}
                    />
                  </LinkScroll>
                </li> */}

                {/* Logo */}
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <img
                    src={NewIA}
                    alt="logo"
                    className={clsx(
                      "transition-all duration-500",
                      hasScrolled ? "w-16 h-16" : "w-20 h-20"
                    )}
                  />
                </div>

                {/* Right */}
                <li className="flex items-center space-x-10 max-lg:flex-col max-lg:space-x-0 max-lg:space-y-4">
                  <NavLink title="Docs" />

                  {/* Desktop enhanced buttons */}
                  <button
                    onClick={loginpage}
                    className="px-5 py-2.5 rounded-lg font-semibold text-white border-1 border-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full font-semibold bg-gray-950 text-white hover:opacity-90 transition-all duration-300 shadow-lg"
                  >
                    Start Free
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden z-30 w-10 h-10 border-2 border-[#3C52D9]/30 rounded-full flex items-center justify-center"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="menu"
            className="w-5 h-5"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;





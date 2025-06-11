// import { Link as LinkScroll } from "react-scroll";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import NewIA from '../../assets/NewIA.png';

// const Header = () => {
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHasScrolled(window.scrollY > 32);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const NavLink = ({ title }) => (
//     <LinkScroll
//       onClick={() => setIsOpen(false)}
//       to={title}
//       offset={-100}
//       spy
//       smooth
//       activeClass="text-[#C8EA80]"
//       className="base-bold text-[#EAEDFF] uppercase transition-colors duration-500 cursor-pointer hover:text-[#2EF2FF] max-lg:my-4 max-lg:h5"
//     >
//       {title}
//     </LinkScroll>
//   );

//   return (
//     <header
//       className={clsx(
//         "fixed top-0 left-0 z-[50] w-full py-10 transition-all duration-500 max-lg:py-4",
//         hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px]",
//       )}
//     >
//       <div className="container flex h-14 items-center max-lg:px-5">
//         <a className="lg:hidden flex-1 cursor-pointer z-[2]">
//           <img src={NewIA} width={115} height={55} alt="logo" />
//         </a>

//         <div
//           className={clsx(
//             "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:bg-s2 max-lg:opacity-0",
//             isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none",
//           )}
//         >
//           <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden max-lg:before:absolute max-lg:before:-right-64 max-lg:before:top-2/5 max-lg:before:h-[440px] max-lg:before:w-[252px] max-lg:before:bg-s4 max-lg:before:blur-[200px] max-lg:before:content-[''] max-md:px-4">
//             <nav className="max-lg:relative max-lg:z-[2] max-lg:my-auto">
//               <ul className="flex max-lg:block max-lg:px-12">
//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="features" />
//                   <div className="dot" />
//                   <NavLink title="pricing" />
//                 </li>

//                 <li className="relative flex flex-1 items-center justify-center">
//                   <LinkScroll
//                     to="hero"
//                     offset={-250}
//                     spy
//                     smooth
//                     className={clsx(
//                       "max-lg:hidden transition-transform duration-500 cursor-pointer",
//                     )}
//                   >
//                     <img
//                       src="/images/xora.svg"
//                       width={160}
//                       height={55}
//                       alt="logo"
//                     />
//                   </LinkScroll>
//                 </li>

//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="faq" />
//                   <div className="size-1.5 rounded-full bg-[#3C52D9] max-lg:hidden" />
//                   <NavLink title="download" />
//                 </li>
//               </ul>
//             </nav>

//             <div className="lg:hidden block absolute top-1/2 left-0 w-[960px] h-[380px] translate-x-[-290px] -translate-y-1/2 rotate-90">
//               <img
//                 src="/images/bg-outlines.svg"
//                 width={960}
//                 height={380}
//                 alt="outline"
//                 className="relative z-[2]"
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

//         <button
//           className="lg:hidden z-[2] size-10 border-2 border-s4/25 rounded-full flex justify-center items-center"
//           onClick={() => setIsOpen((prevState) => !prevState)}
//         >
//           <img
//             src={`/images/${isOpen ? "close" : "magic"}.svg`}
//             alt="magic"
//             className="size-1/2 object-contain"
//           />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { Link as LinkScroll } from "react-scroll";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import NewIA from '../../assets/NewIA.png';

// const Header = () => {
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHasScrolled(window.scrollY > 32);
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
//       className={clsx(
//         "fixed top-0 left-0 z-50 w-full transition-all duration-500 max-lg:py-4",
//         hasScrolled
//         ? "py-2 bg-[#080D27]/80 backdrop-blur-md"
//         : "py-10 bg-[#080D27]"

//       )}
//     >
//       <div className="mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 mx-auto flex items-center px-5 max-lg:px-5 min-h-[56px]">

//         {/* Logo for small screens */}
//         <a className="lg:hidden flex-1 cursor-pointer z-20">
//           <img src={NewIA} width={115} height={55} alt="logo" />
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
//           <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6 max-lg:overflow-hidden max-md:px-4"
//             style={{
//               position: 'relative',
//               overflow: 'hidden',
//             }}
//           >
//             {/* You had a blurred background before with ::before, replace with inline div */}
//             <div
//               style={{
//                 position: 'absolute',
//                 right: '-16rem', // -64
//                 top: '40%',
//                 height: '440px',
//                 width: '252px',
//                 backgroundColor: '#3C52D9', // approx bg-s4
//                 filter: 'blur(200px)',
//                 content: "''",
//                 zIndex: 0,
//                 pointerEvents: 'none',
//               }}
//             ></div>

//             <nav className="max-lg:relative max-lg:z-20 max-lg:my-auto">
//               <ul className="flex max-lg:block max-lg:px-12">
//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="features" />
//                   {/* Removed .dot custom class */}
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
//                     {/* Replaced your /images/xora.svg with NewIA to keep consistent */}
//                     <img
//                       src={NewIA}
//                       width={160}
//                       height={55}
//                       alt="logo"
//                     />
//                   </LinkScroll>
//                 </li>

//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="faq" />
//                   {/* Replaced custom dot with a Tailwind circle */}
//                   <div className="hidden max-lg:block h-6 w-6 rounded-full bg-[#3C52D9]" />
//                   <NavLink title="download" />
//                 </li>
//               </ul>
//             </nav>

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



// import { Link as LinkScroll } from "react-scroll";
// import { useEffect, useState } from "react";
// import clsx from "clsx";
// import NewIA from '../../assets/NewIA.png';

// const Header = () => {
//   const [hasScrolled, setHasScrolled] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setHasScrolled(window.scrollY > 32);
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
//       ? "py-1 bg-[#080D27]/80 backdrop-blur-md"
//       : "py-8 bg-[#080D27]" // try py-8 instead of py-6
//   )}
// >


//       <div
//   className={clsx(
//     "mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4 flex items-center transition-all duration-500 ease-in-out",
//     hasScrolled ? "min-h-[48px]" : "min-h-[120px]"
//   )}
// >


        
//         {/* Logo for small screens */}
//         <a className="lg:hidden flex-1 cursor-pointer z-20">
//           <img
//   src={NewIA}
//   alt="logo"
//   className={clsx(
//     "transition-all duration-500 ease-in-out",
//     hasScrolled ? "w-[90px] h-[35px]" : "w-[140px] h-[60px]"
//   )}
// />


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
//             <div
//               style={{
//                 position: 'absolute',
//                 right: '-16rem',
//                 top: '40%',
//                 height: '440px',
//                 width: '252px',
//                 backgroundColor: '#3C52D9',
//                 filter: 'blur(200px)',
//                 zIndex: 0,
//                 pointerEvents: 'none',
//               }}
//             />

//             <nav className="max-lg:relative max-lg:z-20 max-lg:my-auto">
//               <ul className="flex max-lg:block max-lg:px-12">
//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="features" />
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
//                       width={130}
//                       height={45}
//                       alt="logo"
//                     />
//                   </LinkScroll>
//                 </li>

//                 <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
//                   <NavLink title="faq" />
//                   <div className="hidden max-lg:block h-6 w-6 rounded-full bg-[#3C52D9]" />
//                   <NavLink title="download" />
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
import { useEffect, useState } from "react";
import clsx from "clsx";
import NewIA from '../../assets/NewIA.png';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      : "py-1 bg-[#080D27]" // Less initial vertical padding
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
              hasScrolled ? "w-[75px] h-[75px]" : "w-[120px] h-[120px]"
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

            <nav className="max-lg:relative max-lg:z-20 max-lg:my-auto">
              <ul className="flex max-lg:block max-lg:px-12">
                <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
                  <NavLink title="features" />
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
                        hasScrolled ? "w-[85px] h-[85px]" : "w-[140px] h-[140px]"
                      )}
                    />
                  </LinkScroll>
                </li>

                <li className="relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start">
                  <NavLink title="faq" />
                  <div className="hidden max-lg:block h-6 w-6 rounded-full bg-[#3C52D9]" />
                  <NavLink title="download" />
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

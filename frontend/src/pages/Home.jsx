import Navbar from '../components/Landing/Navbar';
import HeroSection from '../components/Landing/HeroSection';
import Footer from '../components/Landing/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;


// import { githubLogin } from "../services/authServices";

// const Home = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-3xl font-bold">Welcome to IntelliCodeAI</h1>
//       <button
//         onClick={githubLogin}
//         className="mt-6 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition"
//       >
//         Login with GitHub
//       </button>
//     </div>
//   );
// };

// export default Home;

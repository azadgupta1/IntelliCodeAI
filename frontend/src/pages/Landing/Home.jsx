// import HeroSection from '../../components/Landing/HeroSection';
// import Footer from '../../components/Landing/Footer';
// import Hero from '../../components/Hero/Hero';
// import FeatureCard from '../../components/Landing/Features';
// import AIFixSection from '../../components/Landing/AIFixSection';
// import FixCodeSection from '../../components/Landing/FixCodeSection';
// import PreFooterCTA from '../../components/Landing/PreFooterCTA';
// import TestimonialsSection from '../../components/Landing/TestimonialsSection';
// import { ThreeDMarquee } from '../../components/ui/3d-marquee'
// // import WorkflowScene from '../../components/Test_3';

// const HomePage = () => {
//   return (
//     <div>
//       {/* <WorkflowScene /> */}
//       {/* <Hero /> */}
//       <HeroSection />
//       {/* <FixCodeSection /> */}
//       {/* <FeatureCard /> */}
//       {/* <AIFixSection /> */}
      
//       <ThreeDMarquee />
//       <TestimonialsSection />
//       <PreFooterCTA />
//       <Footer />
//     </div>
//   );
// };

// export default HomePage;









import HeroSection from '../../components/Landing/HeroSection';
import Footer from '../../components/Landing/Footer';
import Hero from '../../components/Hero/Hero';
import FeatureCard from '../../components/Landing/Features';
import AIFixSection from '../../components/Landing/AIFixSection';
import FixCodeSection from '../../components/Landing/FixCodeSection';
import PreFooterCTA from '../../components/Landing/PreFooterCTA';
import TestimonialsSection from '../../components/Landing/TestimonialsSection';
import { ThreeDMarquee } from '../../components/ui/3d-marquee'; // named export
import { ThreeDMarqueeDemo } from '../ThreeD';

const HomePage = () => {
  // Random placeholder images
  const randomImages = Array.from({ length: 12 }, (_, i) =>
    `https://picsum.photos/seed/${i + 1}/700/500`
  );

  return (
    <div>
      <HeroSection />
      {/* <Hero /> */}
      {/* <FixCodeSection /> */}
      {/* <FeatureCard /> */}
      {/* <AIFixSection /> */}

      {/* <ThreeDMarquee images={randomImages} /> */}
      <ThreeDMarqueeDemo />

      <TestimonialsSection />
      <PreFooterCTA />
      <Footer />
    </div>
  );
};

export default HomePage;

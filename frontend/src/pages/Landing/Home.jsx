import HeroSection from '../../components/Landing/HeroSection';
import Footer from '../../components/Landing/Footer';
import FeatureCard from '../../components/Landing/Features';
import AIFixSection from '../../components/Landing/AIFixSection';
import FixCodeSection from '../../components/Landing/FixCodeSection';
import PreFooterCTA from '../../components/Landing/PreFooterCTA';
import TestimonialsSection from '../../components/Landing/TestimonialsSection';
import { ThreeDMarquee } from '../../components/ui/3d-marquee'; // named export
import { ThreeDMarqueeDemo } from '../ThreeD';

const HomePage = () => {

  return (
    <div>
      <HeroSection />
      {/* <FixCodeSection /> */}
      {/* <FeatureCard /> */}
      {/* <AIFixSection /> */}

      <ThreeDMarqueeDemo />
      <TestimonialsSection />
      <PreFooterCTA />
      <Footer />
    </div>
  );
};

export default HomePage;

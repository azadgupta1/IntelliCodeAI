import HeroSection from '../../components/Landing/HeroSection';
import Footer from '../../components/Landing/Footer';
import Hero from '../../components/Hero/Hero';
import FeatureCard from '../../components/Landing/Features';
import AIFixSection from '../../components/Landing/AIFixSection';
import FixCodeSection from '../../components/Landing/FixCodeSection';
// import WorkflowScene from '../../components/Test_3';

const HomePage = () => {
  return (
    <div>
      {/* <WorkflowScene /> */}
      {/* <Hero /> */}
      <HeroSection />
      <FeatureCard />
      <AIFixSection />
      <FixCodeSection />
      <Footer />
    </div>
  );
};

export default HomePage;

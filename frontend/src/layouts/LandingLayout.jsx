import { Outlet } from "react-router-dom";
import Header from "../components/Landing/Landing_Header";



const LandingLayout = () => {
  return (
    <div>
      
      <Header/>
      <div> {/* add top padding to avoid content under navbar */}
        <Outlet /> {/* This will render the child route's component */}
      </div>
    </div>
  );
};

export default LandingLayout;

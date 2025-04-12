import Navbar from "../components/Landing/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-16"> {/* add top padding to avoid content under navbar */}
        <Outlet /> {/* This will render the child route's component */}
      </div>
    </div>
  );
};

export default MainLayout;

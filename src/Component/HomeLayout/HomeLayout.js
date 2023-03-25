import { Navigate, useOutlet } from "react-router-dom";

import FishNavBar from "../../Component/Navigation/FishNavBar";

import PWAPrompt from "react-ios-pwa-prompt";
import Footer from "../../Component/Footer/Footer";
import "./HomeLayout.css";

export const HomeLayout = () => {
  //   const { user } = useAuth();
  const outlet = useOutlet();

  //   if (user) {
  //     return <Navigate to="/sendFish" replace />;
  //   }

  return (
    <div className="content">
      <div className="sticky">
        <FishNavBar></FishNavBar>
      </div>
      <div className="incontent">{outlet}</div>
      <PWAPrompt />
      <div className="fish-footer">
        <Footer />
      </div>
    </div>
  );
};

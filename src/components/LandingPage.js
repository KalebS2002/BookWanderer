import React from "react";
import LandingBackground from "../Images/AdvancedLandingPageDesign.jpg";
import "../style/LandingPage.css";
import "../style/Nav.css";
const LandingPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <img id="LandingIcon" src={LandingBackground} alt="Icon"></img>
    </>
  );
};

export default LandingPage;

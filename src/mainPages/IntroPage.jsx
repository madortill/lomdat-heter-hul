import React from "react";
import "../css/IntroPage.css";
import planeText from "../assets/images/introPage/planeText.svg";
import cloud from "../assets/images/openingPage/cloud.png";

function IntroPage({ onNext }) {
  return (
    <div className="introPage">
      <div className="intro-clouds">
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud1" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud2" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud3" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud4" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud5" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud6" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud7" />
      </div>

      <div className="container-intro">
        <img src={planeText} alt="planeText" className="plane-text" />
      </div>
    </div>
  );
}

export default IntroPage;
import React from "react";
import { useState } from "react";
import "./css/App.css";
import til from "./assets/images/tilLogo.svg";
import bahad11Icon from "./assets/images/bahad11Icon.svg";
import OpeningPage from "./mainPages/OpeningPage";
import IntroPage from "./mainPages/IntroPage";


function App() {
  const [currentPage, setCurrentPage] = useState("opening");
  return (
    <>
      <div className={`app ${currentPage}`}>
        <img src={til} alt="til" className="til-logo" />
        <img src={bahad11Icon} alt="bahad11Icon" className="bahad11Icon" />
        {currentPage === "opening" && (
        <OpeningPage onStart={() => setCurrentPage("intro")} />
      )}

      {currentPage === "intro" && (
        <IntroPage />
      )}

      </div>
    </>
  );
}

export default App;

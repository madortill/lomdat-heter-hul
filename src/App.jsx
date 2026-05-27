import React from "react";
import { useState } from "react";
import "./css/App.css";
import til from "./assets/images/tilLogo.svg";
import bahad11Icon from "./assets/images/bahad11Icon.svg";
import OpeningPage from "./mainPages/OpeningPage";

function App() {

  return (
    <>
      <div className="app">
        <img src={til} alt="til" className="til-logo" />
        <img src={bahad11Icon} alt="bahad11Icon" className="bahad11Icon" />
        <OpeningPage/>

      </div>
    </>
  );
}

export default App;

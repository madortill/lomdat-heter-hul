import React, { useState } from "react";
import "./css/App.css";

import til from "./assets/images/tilLogo.svg";
import bahad11Icon from "./assets/images/bahad11Icon.svg";
import mapBtn from "./assets/images/mapBtn.svg";

import OpeningPage from "./mainPages/OpeningPage";
import IntroPage from "./mainPages/IntroPage";
import SubjMap from "./components/SubjMap";

import EnteringRequest from "./components/subjects/EnteringRequest";
import ManualProcedure from "./components/subjects/ManualProcedure";
import DigitalProcedure from "./components/subjects/DigitalProcedure";
import Practice from "./components/subjects/Practice";
import GeneralProcedures from "./components/subjects/GeneralProcedures";

function App() {
  const [currentPage, setCurrentPage] = useState("enteringRequest");
  const [isMapOpen, setIsMapOpen] = useState(false);

  const [unlockedSubjects, setUnlockedSubjects] = useState([
    "enteringRequest",
  ]);

  const subjectOrder = [
    "enteringRequest",
    "manualProcedure",
    "digitalProcedure",
    "practice",
    "generalProcedures",
  ];

  const unlockSubject = (subjectName) => {
    setUnlockedSubjects((prev) => {
      if (prev.includes(subjectName)) return prev;
      return [...prev, subjectName];
    });
  };

  const goTo = (page) => {
    setCurrentPage(page);
    setIsMapOpen(false);
  };

  const goToSubject = (subjectName) => {
    if (!unlockedSubjects.includes(subjectName)) return;
    goTo(subjectName);
  };

  const goNextSubject = () => {
    const currentIndex = subjectOrder.indexOf(currentPage);
    const nextSubject = subjectOrder[currentIndex + 1];

    if (!nextSubject) return;

    unlockSubject(nextSubject);
    goTo(nextSubject);
  };

  const shouldShowMapButton =
    currentPage !== "opening" &&
    currentPage !== "intro" &&
    currentPage !== "map";

  return (
    <div className={`app ${currentPage}`}>
      <img src={til} alt="til" className="til-logo" />
      <img src={bahad11Icon} alt="bahad11Icon" className="bahad11Icon" />

      {shouldShowMapButton && (
        <>
         <img src={mapBtn} alt="mapBtn" className="open-map-button"  onClick={() => setIsMapOpen(true)} />
        {/* <button
          className="open-map-button"
          onClick={() => setIsMapOpen(true)}
        >
          מפה
        </button> */}
        </>
      )}

      {currentPage === "opening" && (
        <OpeningPage onStart={() => goTo("intro")} />
      )}

      {currentPage === "intro" && (
        <IntroPage onNext={() => goTo("map")} />
      )}

      {currentPage === "map" && (
        <SubjMap
          unlockedSubjects={unlockedSubjects}
          onSelectSubject={goToSubject}
        />
      )}

      {currentPage === "enteringRequest" && (
        <EnteringRequest onNext={goNextSubject} />
      )}

      {currentPage === "manualProcedure" && (
        <ManualProcedure onNext={goNextSubject} />
      )}

      {currentPage === "digitalProcedure" && (
        <DigitalProcedure onNext={goNextSubject} />
      )}

      {currentPage === "practice" && (
        <Practice onNext={goNextSubject} />
      )}

      {currentPage === "generalProcedures" && (
        <GeneralProcedures onNext={goNextSubject} />
      )}

      {isMapOpen && (
        <div className="map-overlay">
          <div className="map-modal">
            <button
              className="close-map-button"
              onClick={() => setIsMapOpen(false)}
            >
              ✕
            </button>

            <SubjMap
              isOverlay
              unlockedSubjects={unlockedSubjects}
              onSelectSubject={goToSubject}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
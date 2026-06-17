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
import Questions from "./components/Questions";
import Tips from "./components/subjects/Tips";

function App() {
  const [currentPage, setCurrentPage] = useState("generalProcedures");
  const [isMapOpen, setIsMapOpen] = useState(false);
  
  const [questionNextSubject, setQuestionNextSubject] = useState(null);
  const [questionPreviousSubject, setQuestionPreviousSubject] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState([]);

  const [unlockedSubjects, setUnlockedSubjects] = useState([
    "enteringRequest",
  ]);

  const [subjectsProgress, setSubjectsProgress] = useState({
    enteringRequest: {
      activeItem: null,
      currentStep: 0,
      completedItems: [],

      cafeClickedCroissants: [],
      cafeCompleted: false,

      eiffelPage: 0,
      eiffelCompletedPages: [],

      popupContent: null,

      lampSelectedType: null,
      lampOpenCardsByType: {
        keva: [],
        hova: [],
      },
      lampCompletedTypes: [],
    },

    manualProcedure: {
      activeItem: null,
      currentStep: 0,
      completedItems: [],
    
      gelateriaPage: 0,
    
      gelateriaHovaSelectedFlavor: null,
      gelateriaHovaClickedFlavors: [],
      gelateriaHovaCompleted: false,
    
      gelateriaKevaSelectedFlavor: null,
      gelateriaKevaClickedFlavors: [],
      gelateriaKevaCompleted: false,
    
      pizzeriaCompleted: false,
      pisaCompleted: false,
    },
    digitalProcedure: {},
    activeItem: null,
    currentStep: 0,
    completedItems: [],
  
    practice: {},
    generalProcedures: {},
  });

  const subjectOrder = [
    "enteringRequest",
    "manualProcedure",
    "digitalProcedure",
    "practice",
    "generalProcedures",
  ];

  const updateSubjectProgress = (subjectName, updates) => {
    setSubjectsProgress((prev) => ({
      ...prev,
      [subjectName]: {
        ...prev[subjectName],
        ...updates,
      },
    }));
  };

  const updateSubjectProgressWithCallback = (subjectName, updater) => {
    setSubjectsProgress((prev) => ({
      ...prev,
      [subjectName]: updater(prev[subjectName]),
    }));
  };

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

  const questionIndexBySubject = {
    enteringRequest: 0,
    manualProcedure: 1,
    digitalProcedure: 2,
    generalProcedures: 3,
  };
  const completeQuestion = (questionIndex) => {
    setCompletedQuestions((prev) => {
      if (prev.includes(questionIndex)) return prev;
      return [...prev, questionIndex];
    });
  };
  const goNextSubject = () => {
    const currentIndex = subjectOrder.indexOf(currentPage);
    const nextSubject = subjectOrder[currentIndex + 1];
  
    if (currentPage === "generalProcedures") {
      goTo("tips");
      return;
    }
  
    if (!nextSubject) return;
  
    if (currentPage !== "practice") {
      setQuestionPreviousSubject(currentPage);
      setQuestionNextSubject(nextSubject);
      setQuestionIndex(questionIndexBySubject[currentPage] || 0);
      setCurrentPage("question");
      setIsMapOpen(false);
      return;
    }
  
    unlockSubject(nextSubject);
    goTo(nextSubject);
  };

  const goPreviousSubject = () => {
    const currentIndex = subjectOrder.indexOf(currentPage);
    const previousSubject = subjectOrder[currentIndex - 1];

    if (!previousSubject) return;

    goTo(previousSubject);
  };
  const goNextFromQuestion = () => {
    if (!questionNextSubject) return;
  
    unlockSubject(questionNextSubject);
    goTo(questionNextSubject);
  
    setQuestionNextSubject(null);
    setQuestionPreviousSubject(null);
  };
  
  const goBackFromQuestion = () => {
    if (!questionPreviousSubject) return;
  
    goTo(questionPreviousSubject);
  
    setQuestionNextSubject(null);
    setQuestionPreviousSubject(null);
  };

  const shouldShowMapButton =
  currentPage !== "opening" &&
  currentPage !== "intro" &&
  currentPage !== "map" &&
  currentPage !== "question" &&
  currentPage !== "tips";

  return (
    <div className={`app ${currentPage}`}>
      <img src={til} alt="til" className="til-logo" />
      <img src={bahad11Icon} alt="bahad11Icon" className="bahad11Icon" />

      {shouldShowMapButton && (
        <img
          src={mapBtn}
          alt="mapBtn"
          className="open-map-button"
          onClick={() => setIsMapOpen(true)}
        />
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
{currentPage === "question" && (
  <Questions
    questionIndex={questionIndex}
    isCompleted={completedQuestions.includes(questionIndex)}
    onComplete={() => completeQuestion(questionIndex)}
    onNext={goNextFromQuestion}
    onBack={goBackFromQuestion}
  />
)}

      {currentPage === "enteringRequest" && (
        <EnteringRequest
          onNext={goNextSubject}
          progress={subjectsProgress.enteringRequest}
          setProgress={(updates) =>
            updateSubjectProgress("enteringRequest", updates)
          }
          setProgressWithCallback={(updater) =>
            updateSubjectProgressWithCallback("enteringRequest", updater)
          }
        />
      )}

      {currentPage === "manualProcedure" && (
        <ManualProcedure
          onNext={goNextSubject}
          onBack={goPreviousSubject}
          progress={subjectsProgress.manualProcedure}
          setProgress={(updates) =>
            updateSubjectProgress("manualProcedure", updates)
          }
          setProgressWithCallback={(updater) =>
            updateSubjectProgressWithCallback("manualProcedure", updater)
          }
        />
      )}

      {currentPage === "digitalProcedure" && (
        <DigitalProcedure
          onNext={goNextSubject}
          onBack={goPreviousSubject}
          progress={subjectsProgress.digitalProcedure}
          setProgress={(updates) =>
            updateSubjectProgress("digitalProcedure", updates)
          }
          setProgressWithCallback={(updater) =>
            updateSubjectProgressWithCallback("digitalProcedure", updater)
          }
        />
      )}

      {currentPage === "practice" && (
        <Practice
          onNext={goNextSubject}
          onBack={goPreviousSubject}
          progress={subjectsProgress.practice}
          setProgress={(updates) => updateSubjectProgress("practice", updates)}
          setProgressWithCallback={(updater) =>
            updateSubjectProgressWithCallback("practice", updater)
          }
        />
      )}

      {currentPage === "generalProcedures" && (
        <GeneralProcedures
          onNext={goNextSubject}
          onBack={goPreviousSubject}
          progress={subjectsProgress.generalProcedures}
          setProgress={(updates) =>
            updateSubjectProgress("generalProcedures", updates)
          }
          setProgressWithCallback={(updater) =>
            updateSubjectProgressWithCallback("generalProcedures", updater)
          }
        />
      )}

{currentPage === "tips" && (
  <Tips
    onBack={() => goTo("generalProcedures")}
    onNext={() => goTo("map")}
  />
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
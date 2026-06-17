import React from "react";
import NewYorkBackground from "../../components/backgroundsSvg/NewYorkBackground";
import ShelfGifts from "../../components/ShelfGifts";
import "../../css/GeneralProcedures.css";

import stop from "../../assets/images/generalProcedures/stop.svg";
import taxi from "../../assets/images/generalProcedures/taxi.svg";


import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";

function GeneralProcedures({
  onNext,
  onBack,
  progress,
  setProgress,
  setProgressWithCallback,
}) {
  const {
    activeItem = null,
    currentStep = 0,
    completedItems = [],

    giftsCompleted = false,
    taxiCompleted = false,
  } = progress;

  const steps = ["gifts", "taxi"];

  const isSubjectCompleted = giftsCompleted && taxiCompleted;

  const isModalActionAllowed =
    activeItem === "gifts"
      ? giftsCompleted
      : activeItem === "taxi"
      ? taxiCompleted
      : true;

  const completeGeneralPart = (partName) => {
    if (partName === "gifts") {
      setProgress({ giftsCompleted: true });
      return;
    }

    if (partName === "taxi") {
      setProgress({ taxiCompleted: true });
    }
  };

  const content = {
    gifts: {
      title: "נהלים כלליים",
      text1: 'עדכון בקשה ליציאה לחו"ל',
      text3: "-לחצו על המזכרות לפי הסדר-",
      component: (
        <ShelfGifts
          isCompleted={giftsCompleted}
          onComplete={() => completeGeneralPart("gifts")}
        />
      ),
    },

    taxi: {
      title: "נהלים כלליים",
      text1: "ביטול יציאה לחול ביוזמת הפרט",
      text2: 'במידה והעדכון יהיה לאחר תאריך תחילת ההיתר, (עדכון במדינת היעד) יש לבטל את התהליך שהוזן ולפתוח תהליך חדש באופן ידני ע"י משרד המשא"ן (כמו כן - חובה לתחקר באסמכתא את הנושא).',
      img: stop,
      img2: taxi,
    },
  };

  const handleItemClick = (item) => {
    const itemIndex = steps.indexOf(item);
  
    if (itemIndex === -1) return;
    if (itemIndex > currentStep) return;
  
    if (item === "taxi") {
      setProgress({
        taxiCompleted: true,
      });
    }
  
    setProgressWithCallback((prev) => {
      const prevCompletedItems = prev.completedItems || [];
  
      const nextCompletedItems = prevCompletedItems.includes(item)
        ? prevCompletedItems
        : [...prevCompletedItems, item];
  
      const nextCurrentStep =
        itemIndex === (prev.currentStep || 0)
          ? Math.min((prev.currentStep || 0) + 1, steps.length)
          : prev.currentStep || 0;
  
      return {
        ...prev,
        activeItem: item,
        completedItems: nextCompletedItems,
        currentStep: nextCurrentStep,
      };
    });
  };
  
  const handleModalAction = () => {
    if (!isModalActionAllowed) return;
  
    setProgress({
      activeItem: null,
    });
  };

  const activeContent = activeItem ? content[activeItem] : null;

  return (
    <div className="subject-page general-procedures-page">
      <NewYorkBackground
        onItemClick={handleItemClick}
        currentStep={currentStep}
        completedItems={completedItems}
      />

      {activeItem && activeContent && (
        <div className="info-overlay">
          <div className="info-card general-info-card">
            <button
              className={`close-button ${
                isModalActionAllowed ? "" : "modal-action-disabled"
              }`}
              onClick={handleModalAction}
              disabled={!isModalActionAllowed}
            >
              סגור
            </button>

            <h2>{activeContent.title}</h2>

            {activeContent.text1 && (
              <p className="lamp-subtitle">{activeContent.text1}</p>
            )}

            {activeContent.text2 && (
              <p className="infoCard-text">{activeContent.text2}</p>
            )}
            {(activeContent.img || activeContent.img2) && (
  <div className="general-content-images">
    {activeContent.img && (
      <img
        src={activeContent.img}
        alt=""
        className="general-content-img"
      />
    )}

    {activeContent.img2 && (
      <img
        src={activeContent.img2}
        alt=""
        className="general-content-img2"
      />
    )}
  </div>
)}

            {activeContent.text3 && (
              <p className="microcopy">{activeContent.text3}</p>
            )}

            {activeContent.component && (
              <div className="info-card-component">
                {activeContent.component}
              </div>
            )}

            {activeContent.actionText && (
              <button
                className="manual-action-button"
                onClick={activeContent.onAction}
              >
                {activeContent.actionText}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="intro-general-nav">
        <img
          src={backBtnText}
          alt="חזור"
          className="intro-general-btn intro-general-back"
          onClick={onBack}
        />

        <img
          src={nextBtnText}
          alt="הבא"
          className={`intro-general-btn intro-general-next ${
            isSubjectCompleted ? "" : "intro-general-btn-disabled"
          }`}
          onClick={isSubjectCompleted ? onNext : undefined}
        />
      </div>
    </div>
  );
}

export default GeneralProcedures;
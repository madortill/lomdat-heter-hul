import React from "react";
import ItalyBackground from "../../components/backgroundsSvg/ItalyBackground";
import IceCream from "../../components/IceCream";
import "../../css/ManualProcedure.css";

import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";

function ManualProcedure({
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
  
    gelateriaPage = 0,
  
    gelateriaHovaSelectedFlavor = null,
    gelateriaHovaClickedFlavors = [],
    gelateriaHovaCompleted = false,
  
    gelateriaKevaSelectedFlavor = null,
    gelateriaKevaClickedFlavors = [],
    gelateriaKevaCompleted = false,
  
    pizzeriaCompleted = false,
    pisaCompleted = false,
  } = progress;

  const steps = ["gelateria", "pizzeria", "pisa"];

  const isModalActionAllowed =
    activeItem === "gelateria"
      ? gelateriaCompleted
      : activeItem === "pizzeria"
      ? pizzeriaCompleted
      : activeItem === "pisa"
      ? pisaCompleted
      : true;

  const isSubjectCompleted =
    gelateriaCompleted && pizzeriaCompleted && pisaCompleted;

  const setGelateriaSelectedFlavor = (value) => {
    setProgress({ gelateriaSelectedFlavor: value });
  };

  const setGelateriaClickedFlavors = (valueOrUpdater) => {
    setProgressWithCallback((prev) => ({
      ...prev,
      gelateriaClickedFlavors:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev.gelateriaClickedFlavors || [])
          : valueOrUpdater,
    }));
  };

  const completeManualPart = (partName) => {
    if (partName === "gelateria") {
      setProgress({ gelateriaCompleted: true });
      return;
    }

    if (partName === "pizzeria") {
      setProgress({ pizzeriaCompleted: true });
      return;
    }

    if (partName === "pisa") {
      setProgress({ pisaCompleted: true });
    }
  };

  const content = {
    gelateria: {
      title: "נוהל ידני",
      text1: "מתי נעבוד בנוהל זה?",
      text2: "חיילי חובה",
      text3: "-לחצו על טעמי הגלידה-",
      component: (
        <IceCream
          selectedFlavor={gelateriaSelectedFlavor}
          setSelectedFlavor={setGelateriaSelectedFlavor}
          clickedFlavors={gelateriaClickedFlavors}
          setClickedFlavors={setGelateriaClickedFlavors}
          onComplete={() => completeManualPart("gelateria")}
        />
      ),
    },

    pizzeria: {
      title: "נוהל ידני",
      text1: "כאן יופיע ההסבר השני של הפיצריה.",
      text2: "בהמשך אפשר להחליף את זה בקומפוננטה אינטראקטיבית.",
      actionText: "סיימתי לקרוא",
      onAction: () => completeManualPart("pizzeria"),
    },

    pisa: {
      title: "נוהל ידני",
      text1: "כאן יופיע ההסבר השלישי של מגדל פיזה.",
      text2: "בהמשך אפשר להחליף את זה בקומפוננטה אינטראקטיבית.",
      actionText: "סיימתי לקרוא",
      onAction: () => completeManualPart("pisa"),
    },
  };

  const handleItemClick = (item) => {
    const itemIndex = steps.indexOf(item);

    if (itemIndex > currentStep) return;

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

    setProgress({ activeItem: null });
  };

  const activeContent = activeItem ? content[activeItem] : null;

  return (
    <div className="subject-page manual-procedure-page">
      <ItalyBackground
        onItemClick={handleItemClick}
        currentStep={currentStep}
        completedItems={completedItems}
      />

      {activeItem && activeContent && (
        <div className="info-overlay">
          <div className="info-card">
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
              <p className="infoCard-text">{activeContent.text1}</p>
            )}

            {activeContent.text2 && (
              <p className="infoCard-text">{activeContent.text2}</p>
            )}

            {activeContent.text3 && (
              <p className="microcopy">{activeContent.text3}</p>
            )}

            {activeContent.actionText && (
              <button
                className="manual-action-button"
                onClick={activeContent.onAction}
              >
                {activeContent.actionText}
              </button>
            )}

            {activeContent.component && (
              <div className="info-card-component">
                {activeContent.component}
              </div>
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

export default ManualProcedure;
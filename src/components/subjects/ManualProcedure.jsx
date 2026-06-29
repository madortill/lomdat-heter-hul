import React from "react";
import ItalyBackground from "../../components/backgroundsSvg/ItalyBackground";
import IceCream from "../../components/IceCream";
import PizzaTopics from "../../components/PizzaTopics";
import "../../css/ManualProcedure.css";

import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png";

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

    pizzeriaPage = 0,

    pizzeriaHovaSelectedTopic = null,
    pizzeriaHovaAddedTopics = [],
    pizzeriaHovaCompleted = false,

    pizzeriaKevaSelectedTopic = null,
    pizzeriaKevaAddedTopics = [],
    pizzeriaKevaCompleted = false,

    pisaCompleted = false,
  } = progress;

  const steps = ["gelateria", "pizzeria", "pisa"];

  const isGelateriaHovaPage = gelateriaPage === 0;
  const isGelateriaKevaPage = gelateriaPage === 1;

  const gelateriaCompleted =
    gelateriaHovaCompleted && gelateriaKevaCompleted;

  const isGelateriaCurrentPageCompleted = isGelateriaHovaPage
    ? gelateriaHovaCompleted
    : gelateriaKevaCompleted;

  const isPizzeriaHovaPage = pizzeriaPage === 0;
  const isPizzeriaKevaPage = pizzeriaPage === 1;

  const pizzeriaCompleted =
    pizzeriaHovaCompleted && pizzeriaKevaCompleted;

  const isPizzeriaCurrentPageCompleted = isPizzeriaHovaPage
    ? pizzeriaHovaCompleted
    : pizzeriaKevaCompleted;

    const isModalActionAllowed =
    activeItem === "gelateria"
      ? isGelateriaCurrentPageCompleted
      : activeItem === "pizzeria"
      ? isPizzeriaCurrentPageCompleted
      : true;

  const isSubjectCompleted =
    gelateriaCompleted && pizzeriaCompleted && pisaCompleted;

  const setGelateriaSelectedFlavor = (value) => {
    if (isGelateriaHovaPage) {
      setProgress({ gelateriaHovaSelectedFlavor: value });
      return;
    }

    setProgress({ gelateriaKevaSelectedFlavor: value });
  };

  const setGelateriaClickedFlavors = (valueOrUpdater) => {
    setProgressWithCallback((prev) => {
      const clickedFlavorsKey =
        (prev.gelateriaPage || 0) === 0
          ? "gelateriaHovaClickedFlavors"
          : "gelateriaKevaClickedFlavors";

      return {
        ...prev,
        [clickedFlavorsKey]:
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(prev[clickedFlavorsKey] || [])
            : valueOrUpdater,
      };
    });
  };

  const setPizzeriaSelectedTopic = (value) => {
    if (isPizzeriaHovaPage) {
      setProgress({ pizzeriaHovaSelectedTopic: value });
      return;
    }

    setProgress({ pizzeriaKevaSelectedTopic: value });
  };

  const setPizzeriaAddedTopics = (valueOrUpdater) => {
    setProgressWithCallback((prev) => {
      const addedTopicsKey =
        (prev.pizzeriaPage || 0) === 0
          ? "pizzeriaHovaAddedTopics"
          : "pizzeriaKevaAddedTopics";

      return {
        ...prev,
        [addedTopicsKey]:
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(prev[addedTopicsKey] || [])
            : valueOrUpdater,
      };
    });
  };

  const getGelateriaSelectedFlavor = () => {
    return isGelateriaHovaPage
      ? gelateriaHovaSelectedFlavor
      : gelateriaKevaSelectedFlavor;
  };

  const getGelateriaClickedFlavors = () => {
    return isGelateriaHovaPage
      ? gelateriaHovaClickedFlavors
      : gelateriaKevaClickedFlavors;
  };

  const getPizzeriaSelectedTopic = () => {
    return isPizzeriaHovaPage
      ? pizzeriaHovaSelectedTopic
      : pizzeriaKevaSelectedTopic;
  };

  const getPizzeriaAddedTopics = () => {
    return isPizzeriaHovaPage
      ? pizzeriaHovaAddedTopics
      : pizzeriaKevaAddedTopics;
  };

  const completeManualPart = (partName) => {
    if (partName === "gelateria") {
      setProgressWithCallback((prev) => {
        const currentGelateriaPage = prev.gelateriaPage || 0;

        if (currentGelateriaPage === 0) {
          return {
            ...prev,
            gelateriaHovaCompleted: true,
          };
        }

        return {
          ...prev,
          gelateriaKevaCompleted: true,
        };
      });

      return;
    }

    if (partName === "pizzeria") {
      setProgressWithCallback((prev) => {
        const currentPizzeriaPage = prev.pizzeriaPage || 0;

        if (currentPizzeriaPage === 0) {
          return {
            ...prev,
            pizzeriaHovaCompleted: true,
          };
        }

        return {
          ...prev,
          pizzeriaKevaCompleted: true,
        };
      });

      return;
    }

    if (partName === "pisa") {
      setProgress({ pisaCompleted: true });
    }
  };

  const handleGelateriaNext = () => {
    if (!gelateriaHovaCompleted) return;

    setProgress({ gelateriaPage: 1 });
  };

  const handleGelateriaBack = () => {
    setProgress({ gelateriaPage: 0 });
  };

  const handlePizzeriaNext = () => {
    if (!pizzeriaHovaCompleted) return;

    setProgress({ pizzeriaPage: 1 });
  };

  const handlePizzeriaBack = () => {
    setProgress({ pizzeriaPage: 0 });
  };

  const content = {
    gelateria: {
      title: "נוהל ידני",
      text1: "מתי נעבוד בנוהל זה?",
      text2: isGelateriaHovaPage ? "חיילי חובה" : "חיילי קבע",
      text3: "-לחצו על טעמי הגלידה-",
      component: (
        <IceCream
          key={gelateriaPage}
          type={isGelateriaHovaPage ? "hova" : "keva"}
          selectedFlavor={getGelateriaSelectedFlavor()}
          setSelectedFlavor={setGelateriaSelectedFlavor}
          clickedFlavors={getGelateriaClickedFlavors()}
          setClickedFlavors={setGelateriaClickedFlavors}
          onComplete={() => completeManualPart("gelateria")}
        />
      ),
    },

    pizzeria: {
      title: "נוהל ידני",
      text1: isPizzeriaHovaPage ? "חיילי חובה" : "חיילי קבע",
      text3: "-גררו את המרכיבים לפי הסדר-",
      component: (
        <PizzaTopics
          key={pizzeriaPage}
          type={isPizzeriaHovaPage ? "hova" : "keva"}
          selectedTopic={getPizzeriaSelectedTopic()}
          setSelectedTopic={setPizzeriaSelectedTopic}
          addedTopics={getPizzeriaAddedTopics()}
          setAddedTopics={setPizzeriaAddedTopics}
          onComplete={() => completeManualPart("pizzeria")}
        />
      ),
    },

    pisa: {
      title: "נוהל ידני",
      text1: "כך נראה נוהל ידני",
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
  
        ...(item === "pisa" ? { pisaCompleted: true } : {}),
      };
    });
  };

  const handleModalAction = () => {
    if (!isModalActionAllowed) return;

    if (
      activeItem === "gelateria" &&
      isGelateriaHovaPage &&
      gelateriaHovaCompleted
    ) {
      handleGelateriaNext();
      return;
    }

    if (
      activeItem === "pizzeria" &&
      isPizzeriaHovaPage &&
      pizzeriaHovaCompleted
    ) {
      handlePizzeriaNext();
      return;
    }

    setProgress({ activeItem: null });
  };

  const handleBackInsideModal = () => {
    if (activeItem === "gelateria" && isGelateriaKevaPage) {
      handleGelateriaBack();
      return;
    }

    if (activeItem === "pizzeria" && isPizzeriaKevaPage) {
      handlePizzeriaBack();
    }
  };

  const getModalButtonText = () => {
    if (
      activeItem === "gelateria" &&
      isGelateriaHovaPage &&
      gelateriaHovaCompleted
    ) {
      return "המשך";
    }

    if (
      activeItem === "pizzeria" &&
      isPizzeriaHovaPage &&
      pizzeriaHovaCompleted
    ) {
      return "המשך";
    }

    return "סגור";
  };

  const shouldShowBackInsideModal =
    (activeItem === "gelateria" && isGelateriaKevaPage) ||
    (activeItem === "pizzeria" && isPizzeriaKevaPage);

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
            {shouldShowBackInsideModal && (
              <button className="back-button" onClick={handleBackInsideModal}>
                <img src={backBtnDiv} alt="חזור" />
              </button>
            )}

            <button
              className={`close-button ${
                isModalActionAllowed ? "" : "modal-action-disabled"
              }`}
              onClick={handleModalAction}
              disabled={!isModalActionAllowed}
            >
              {getModalButtonText()}
            </button>

            <h2>{activeContent.title}</h2>

            {activeContent.text1 && (
              <p className="lamp-subtitle">{activeContent.text1}</p>
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
            isSubjectCompleted ? "" : "disabled-general-btn no-mouse-events"
          }`}
          onClick={isSubjectCompleted ? onNext : undefined}
        />
      </div>
    </div>
  );
}

export default ManualProcedure;
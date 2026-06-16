import React from "react";
import ThailandBackground from "../../components/backgroundsSvg/ThailandBackground";
import FruitBasket from "../../components/FruitBasket";
import "../../css/Practice.css";

import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png";

import kevaImg from "../../assets/images/enteringRequest/kevaImg.svg";
import hovaImg from "../../assets/images/enteringRequest/hovaImg.svg";

function Practice({
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

    practicePage = 0,
    selectedPracticeType = null,
    fruitStandCompleted = false,
  } = progress;

  const steps = ["fruitStand"];

  const isChooseCharacterPage = practicePage === 0;
  const isBasketPage = practicePage === 1;

  const isSubjectCompleted = fruitStandCompleted;

  const isModalActionAllowed =
    activeItem === "fruitStand" ? fruitStandCompleted : true;

  const completePracticePart = (partName) => {
    if (partName === "fruitStand") {
      setProgress({ fruitStandCompleted: true });
    }
  };

  const choosePracticeType = (type) => {
    setProgress({
      selectedPracticeType: type,
      practicePage: 1,
    });
  };

  const handlePracticeBack = () => {
    setProgress({
      practicePage: 0,
      fruitStandCompleted: false,
    });
  };

  const content = {
    fruitStand: {
      title: "תרגול",
      text1: isChooseCharacterPage
        ? "איך תעשו את זה?"
        : selectedPracticeType === "hova"
        ? "חיילי חובה"
        : "אנשי קבע",
      text2: isChooseCharacterPage
        ? "בתרגול הבא, אתם תצטרכו להרכיב את סלסילת הפירות הנכונה"
        : "לחצו על הפירות לפי סדר השלבים הנכון.",
      text3: isChooseCharacterPage
        ? "אתם תצטרכו לעבור את התהליך להשגת היתר חו״ל לפי הסדר הנכון"
        : "",
      text4: isChooseCharacterPage
        ? "תחילה, בחרו האם לעבור את התהליך כחייל חובה או כאיש קבע"
        : "",
      component: isChooseCharacterPage ? (
        <div className="practice-character-choice">
          <button
            type="button"
            className="practice-character-button"
            onClick={() => choosePracticeType("hova")}
          >
            <img src={hovaImg} alt="חיילי חובה" />
            <span>חיילי חובה</span>
          </button>

          <button
            type="button"
            className="practice-character-button"
            onClick={() => choosePracticeType("keva")}
          >
            <img src={kevaImg} alt="אנשי קבע" />
            <span>אנשי קבע</span>
          </button>
        </div>
      ) : (
        <FruitBasket
          type={selectedPracticeType}
          isCompleted={fruitStandCompleted}
          onComplete={() => completePracticePart("fruitStand")}
        />
      ),
    },
  };

  const handleItemClick = (item) => {
    const itemIndex = steps.indexOf(item);

    if (itemIndex === -1) return;
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

  const shouldShowBackInsideModal =
    activeItem === "fruitStand" && isBasketPage && !fruitStandCompleted;

  const activeContent = activeItem ? content[activeItem] : null;

  return (
    <div className="subject-page practice-page">
      <ThailandBackground
        onItemClick={handleItemClick}
        currentStep={currentStep}
        completedItems={completedItems}
      />

      {activeItem && activeContent && (
        <div className="info-overlay">
          <div className="info-card practice-info-card">
            {shouldShowBackInsideModal && (
              <button className="back-button" onClick={handlePracticeBack}>
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
              סגור
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

            {activeContent.text4 && (
              <p className="microcopy">{activeContent.text4}</p>
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

export default Practice;
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

    practiceHovaCompleted = false,
    practiceKevaCompleted = false,
  } = progress;

  const steps = ["fruitStand"];

  const isChooseCharacterPage = practicePage === 0;
  const isBasketPage = practicePage === 1;

  const fruitStandCompleted = practiceHovaCompleted && practiceKevaCompleted;

  const currentPracticeCompleted =
    selectedPracticeType === "hova"
      ? practiceHovaCompleted
      : selectedPracticeType === "keva"
      ? practiceKevaCompleted
      : false;

  const isSubjectCompleted = fruitStandCompleted;

  const isModalActionAllowed =
    activeItem === "fruitStand" ? fruitStandCompleted : true;

  const choosePracticeType = (type) => {
    setProgress({
      selectedPracticeType: type,
      practicePage: 1,
    });
  };

  const completePracticePart = () => {
    if (selectedPracticeType === "hova") {
      setProgress({
        practiceHovaCompleted: true,
      });
      return;
    }

    if (selectedPracticeType === "keva") {
      setProgress({
        practiceKevaCompleted: true,
      });
    }
  };

  const handlePracticeBack = () => {
    setProgress({
      selectedPracticeType: null,
      practicePage: 0,
    });
  };

  const content = {
    fruitStand: {
      title: "תרגול",
      text1: isChooseCharacterPage
        ? "איך תעשו את זה?"
        : selectedPracticeType === "hova"
        ? "חיילי חובה - נוהל דיגיטלי"
        : "אנשי קבע - נוהל דיגיטלי",

      text2: isChooseCharacterPage
        ? "בתרגול הבא, אתם תצטרכו להרכיב את סלסילת הפירות הנכונה"
        : "בחרו בכל פעם את השלב הבא לפי הסדר הנכון.",

      text3: isChooseCharacterPage
        ? "אתם תצטרכו לעבור את התהליך להשגת היתר חו״ל לפי הסדר הנכון"
        : "",

      text4: isChooseCharacterPage
        ? "בחרו אם להתחיל כחייל חובה או כאיש קבע"
        : "",

      component: isChooseCharacterPage ? (
        <>
          <div className="practice-character-choice">
            <button
              type="button"
              className={`practice-character-button ${
                practiceHovaCompleted ? "practice-character-completed" : ""
              }`}
              onClick={() => choosePracticeType("hova")}
            >
              <img src={hovaImg} alt="חיילי חובה" />
              <span>חיילי חובה</span>
            </button>

            <button
              type="button"
              className={`practice-character-button ${
                practiceKevaCompleted ? "practice-character-completed" : ""
              }`}
              onClick={() => choosePracticeType("keva")}
            >
              <img src={kevaImg} alt="אנשי קבע" />
              <span>אנשי קבע</span>
            </button>
          </div>

          {(practiceHovaCompleted || practiceKevaCompleted) &&
            !fruitStandCompleted && (
              <p className="practice-progress-note">
                מעולה! עכשיו השלימו גם את המסלול השני.
              </p>
            )}

          {fruitStandCompleted && (
            <p className="practice-progress-note">
              כל הכבוד! השלמתם גם חובה וגם קבע.
            </p>
          )}
        </>
      ) : (
        <FruitBasket
          key={selectedPracticeType}
          type={selectedPracticeType}
          isCompleted={currentPracticeCompleted}
          onComplete={completePracticePart}
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

    setProgress({
      activeItem: null,
    });
  };

  const shouldShowBackInsideModal =
    activeItem === "fruitStand" && isBasketPage && currentPracticeCompleted;

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
              <p className="infoCard-text">{activeContent.text3}</p>
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
            isSubjectCompleted ? "" : "disabled-general-btn no-mouse-events"
          }`}
          onClick={isSubjectCompleted ? onNext : undefined}
        />
      </div>
    </div>
  );
}

export default Practice;
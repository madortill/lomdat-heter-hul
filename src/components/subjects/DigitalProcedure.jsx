import React from "react";
import LondonBackground from "../../components/backgroundsSvg/LondonBackground";
import PhoneClicks from "../../components/PhoneClicks";
import ClockBigBen from "../../components/ClockBigBen";
import "../../css/DigitalProcedure.css";

import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png";

function DigitalProcedure({
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

    phonePage = 0,
    phoneHovaCompleted = false,
    phoneKevaCompleted = false,

    bigBenPage = 0,
    bigBenHovaCompleted = false,
    bigBenKevaCompleted = false,
  } = progress;

  const steps = ["phone", "bigBen"];

  const isPhoneHovaPage = phonePage === 0;
  const isPhoneKevaPage = phonePage === 1;

  const isBigBenHovaPage = bigBenPage === 0;
  const isBigBenKevaPage = bigBenPage === 1;

  const phoneCompleted = phoneHovaCompleted && phoneKevaCompleted;
  const bigBenCompleted = bigBenHovaCompleted && bigBenKevaCompleted;

  const isPhoneCurrentPageCompleted = isPhoneHovaPage
    ? phoneHovaCompleted
    : phoneKevaCompleted;

  const isBigBenCurrentPageCompleted = isBigBenHovaPage
    ? bigBenHovaCompleted
    : bigBenKevaCompleted;

  const isSubjectCompleted = phoneCompleted && bigBenCompleted;

  const isModalActionAllowed =
    activeItem === "phone"
      ? isPhoneCurrentPageCompleted
      : activeItem === "bigBen"
      ? isBigBenCurrentPageCompleted
      : true;

  const completeDigitalPart = (partName) => {
    if (partName === "phone") {
      setProgressWithCallback((prev) => {
        const currentPhonePage = prev.phonePage || 0;

        if (currentPhonePage === 0) {
          return {
            ...prev,
            phoneHovaCompleted: true,
          };
        }

        return {
          ...prev,
          phoneKevaCompleted: true,
        };
      });

      return;
    }

    if (partName === "bigBen") {
      setProgressWithCallback((prev) => {
        const currentBigBenPage = prev.bigBenPage || 0;

        if (currentBigBenPage === 0) {
          return {
            ...prev,
            bigBenHovaCompleted: true,
          };
        }

        return {
          ...prev,
          bigBenKevaCompleted: true,
        };
      });
    }
  };

  const handlePhoneNext = () => {
    if (!phoneHovaCompleted) return;
    setProgress({ phonePage: 1 });
  };

  const handlePhoneBack = () => {
    setProgress({ phonePage: 0 });
  };

  const handleBigBenNext = () => {
    if (!bigBenHovaCompleted) return;
    setProgress({ bigBenPage: 1 });
  };

  const handleBigBenBack = () => {
    setProgress({ bigBenPage: 0 });
  };

  const content = {
    phone: {
      title: "נוהל דיגיטלי",
      text1: "מתי נעבוד בנוהל זה?",
      text2: isPhoneHovaPage ? "חיילי חובה" : "אנשי קבע",
      text3: "-לחצו על המספרים לפי סדר הופעתם-",
      component: (
        <PhoneClicks
          key={phonePage}
          type={isPhoneHovaPage ? "hova" : "keva"}
          isCompleted={
            isPhoneHovaPage ? phoneHovaCompleted : phoneKevaCompleted
          }
          onComplete={() => completeDigitalPart("phone")}
          successText={
            isPhoneHovaPage
              ? "חייל חובה המעוניין לטוס לחו״ל במסגרת חופשה שנתית או בימי חופשה על חשבון המערכת (סופי שבוע או חגים מטכ״ליים)."
              : 'משרת קבע המעוניין לטוס לחו"ל במסגרת חופשה שנתית או בימי חופשה על חשבון המערכת (סופי שבוע או חגים מטכ"ליים). לעומת חיילי חובה, משרת קבע מסופח יזין את בקשתו בנוהל הדיגיטלי.'
          }
        />
      ),
    },

    bigBen: {
      title: "נוהל דיגיטלי",
      text1: isBigBenHovaPage ? "חיילי חובה" : "אנשי קבע",
      text3: "-לחצו על הכותרות שעל השעון-",
      component: (
        <ClockBigBen
          key={bigBenPage}
          type={isBigBenHovaPage ? "hova" : "keva"}
          isCompleted={
            isBigBenHovaPage ? bigBenHovaCompleted : bigBenKevaCompleted
          }
          onComplete={() => completeDigitalPart("bigBen")}
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

    if (
      activeItem === "phone" &&
      isPhoneHovaPage &&
      phoneHovaCompleted
    ) {
      handlePhoneNext();
      return;
    }

    if (
      activeItem === "bigBen" &&
      isBigBenHovaPage &&
      bigBenHovaCompleted
    ) {
      handleBigBenNext();
      return;
    }

    setProgress({ activeItem: null });
  };

  const handleBackInsideModal = () => {
    if (activeItem === "phone" && isPhoneKevaPage) {
      handlePhoneBack();
      return;
    }

    if (activeItem === "bigBen" && isBigBenKevaPage) {
      handleBigBenBack();
    }
  };

  const getModalButtonText = () => {
    if (
      activeItem === "phone" &&
      isPhoneHovaPage &&
      phoneHovaCompleted
    ) {
      return "המשך";
    }

    if (
      activeItem === "bigBen" &&
      isBigBenHovaPage &&
      bigBenHovaCompleted
    ) {
      return "המשך";
    }

    return "סגור";
  };

  const shouldShowBackInsideModal =
    (activeItem === "phone" && isPhoneKevaPage) ||
    (activeItem === "bigBen" && isBigBenKevaPage);

  const activeContent = activeItem ? content[activeItem] : null;

  return (
    <div className="subject-page digital-procedure-page">
      <LondonBackground
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

export default DigitalProcedure;
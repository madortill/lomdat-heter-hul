import React from "react";
import ParisBackground from "../../components/backgroundsSvg/ParisBackground";
import CoffeeTable from "../../components/CoffeeTable";
import EiffelFlow from "../../components/EiffelFlow";
import LampPages from "../../components/LampPages";
import "../../css/EnteringRequest.css";

import dayelet from "../../assets/images/dayelet.svg";
import bubbleTalkDayelet from "../../assets/images/bubbleTalkDayelet.svg";
import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";

import warComment from "../../assets/images/enteringRequest/warComment1.svg";
import eiffelSide from "../../assets/images/enteringRequest/eiffelSide.svg";
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png";
import flowChart from "../../assets/images/enteringRequest/flowChart.svg";
import pressWar from "../../assets/images/enteringRequest/pressWar.svg";
import swords from "../../assets/images/enteringRequest/swords.png";

function EnteringRequest({
  onNext,
  progress,
  setProgress,
  setProgressWithCallback,
}) {
  const {
    activeItem,
    currentStep,
    completedItems,

    cafeClickedCroissants,
    cafeCompleted,

    eiffelPage,
    eiffelCompletedPages,

    popupContent,

    lampSelectedType,
    lampOpenCardsByType,
    lampCompletedTypes,
  } = progress;

  const steps = ["cafe", "eiffel", "lamp"];

  const isLampCompleted =
    lampCompletedTypes.includes("keva") &&
    lampCompletedTypes.includes("hova");

  const isEiffelCurrentPageCompleted =
    eiffelCompletedPages.includes(eiffelPage);

  const isModalActionAllowed =
    activeItem === "cafe"
      ? cafeCompleted
      : activeItem === "eiffel"
      ? isEiffelCurrentPageCompleted
      : activeItem === "lamp"
      ? isLampCompleted
      : true;

  const isSubjectCompleted =
    cafeCompleted &&
    eiffelCompletedPages.includes(0) &&
    eiffelCompletedPages.includes(1) &&
    lampCompletedTypes.includes("keva") &&
    lampCompletedTypes.includes("hova");

  const setCafeClickedCroissants = (valueOrUpdater) => {
    setProgressWithCallback((prev) => ({
      ...prev,
      cafeClickedCroissants:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev.cafeClickedCroissants)
          : valueOrUpdater,
    }));
  };

  const setLampSelectedType = (value) => {
    setProgress({ lampSelectedType: value });
  };

  const setLampOpenCardsByType = (valueOrUpdater) => {
    setProgressWithCallback((prev) => ({
      ...prev,
      lampOpenCardsByType:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev.lampOpenCardsByType)
          : valueOrUpdater,
    }));
  };

  const completeEiffelPage = (pageNumber) => {
    setProgressWithCallback((prev) => ({
      ...prev,
      eiffelCompletedPages: prev.eiffelCompletedPages.includes(pageNumber)
        ? prev.eiffelCompletedPages
        : [...prev.eiffelCompletedPages, pageNumber],
    }));
  };

  const completeLampType = (type) => {
    setProgressWithCallback((prev) => ({
      ...prev,
      lampCompletedTypes: prev.lampCompletedTypes.includes(type)
        ? prev.lampCompletedTypes
        : [...prev.lampCompletedTypes, type],
    }));
  };

  const content = {
    cafe: {
      title: "הזנת בקשה",
      text1:
        "חו”ל בדיגיטל - מאפשר לחיילי חובה ואנשי קבע להגיש בקשת יציאה לחו”ל בדיגיטל באזור האישי באתר צה”ל ואישור המפקד יבוצע במערכת אנשים.",
      text2: "-לחצו על הקוראסונים-",
      component: (
        <CoffeeTable
          clickedCroissants={cafeClickedCroissants}
          setClickedCroissants={setCafeClickedCroissants}
          onComplete={() => setProgress({ cafeCompleted: true })}
        />
      ),
      img: warComment,
    },

    eiffel: {
      title: "הזנת בקשה",
      sideImg: eiffelSide,
      sideImgClass: "eiffel-side-img",
      pages: [
        {
          text1:
            "לאחר הזנת הבקשה תישלח הודעה לפרט ולמפקדו הישיר בדבר ההחלטה, אשר תשלח גם לסגל המשא”ן.",
          component: (
            <EiffelFlow
              isCompleted={eiffelCompletedPages.includes(0)}
              onComplete={() => completeEiffelPage(0)}
            />
          ),
        },
        {
          img: flowChart,
          imgClass: "flowChart-img",
          popupTriggerImg: pressWar,
          popupTriggerClass: "img-popup-trigger",
          popupText:
            'בתחילת המלחמה, התעדכנו סמכויות לאשר בקשה זו, כך שאישור חו"ל עבור חיילי סדיר ע"י מפקד בדרגת אל"ם, עבור אנשי קבע וקצינים ע"י אלוף. היום כלל האישורים הינם בסמכות סא"ל.',
        },
      ],
    },

    lamp: {
      title: "הזנת בקשה",
      component: (
        <LampPages
          selectedType={lampSelectedType}
          setSelectedType={setLampSelectedType}
          openCardsByType={lampOpenCardsByType}
          setOpenCardsByType={setLampOpenCardsByType}
          completedTypes={lampCompletedTypes}
          onCompleteType={completeLampType}
        />
      ),
    },
  };

  const handleItemClick = (item) => {
    const itemIndex = steps.indexOf(item);

    if (itemIndex > currentStep) return;

    setProgressWithCallback((prev) => {
      const nextCompletedItems = prev.completedItems.includes(item)
        ? prev.completedItems
        : [...prev.completedItems, item];

      const nextCurrentStep =
        itemIndex === prev.currentStep
          ? Math.min(prev.currentStep + 1, steps.length)
          : prev.currentStep;

      return {
        ...prev,
        activeItem: item,
        eiffelPage: item === "eiffel" ? 0 : prev.eiffelPage,
        completedItems: nextCompletedItems,
        currentStep: nextCurrentStep,
      };
    });
  };

  const handleModalAction = () => {
    if (!isModalActionAllowed) return;

    if (activeItem === "eiffel" && eiffelPage === 0) {
      setProgress({ eiffelPage: 1 });
      return;
    }

    setProgress({ activeItem: null });
  };

  const handleBack = () => {
    if (activeItem === "eiffel" && eiffelPage > 0) {
      setProgress({ eiffelPage: eiffelPage - 1 });
    }
  };

  const activeContent = activeItem
    ? activeItem === "eiffel"
      ? {
          ...content.eiffel,
          ...content.eiffel.pages[eiffelPage],
        }
      : content[activeItem]
    : null;

  return (
    <div className="subject-page">
      <ParisBackground
        onItemClick={handleItemClick}
        currentStep={currentStep}
        completedItems={completedItems}
      />

      <div className="dayelet-scene">
        <img src={dayelet} alt="" className="dayelet" />

        <img src={bubbleTalkDayelet} alt="" className="bubble-talk-dayelet" />

        <p className="dayelet-bubble-text">
          על מה נלמד במדינה?
          <br />
          נלמד איך מזינים בקשה,
          <br />
          מי מאשר אותה
          <br />
          ומה חשוב לבדוק.
        </p>
      </div>

      {activeItem && activeContent && (
        <div className="info-overlay">
          <div className="info-card">
            {activeItem === "eiffel" && eiffelPage > 0 && (
              <button className="back-button" onClick={handleBack}>
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
              {activeItem === "eiffel" && eiffelPage === 0 ? "המשך" : "סגור"}
            </button>

            <h2>{activeContent.title}</h2>

            {activeContent.sideImg && (
              <img
                className={activeContent.sideImgClass}
                src={activeContent.sideImg}
                alt=""
              />
            )}

            {activeContent.text1 && (
              <p className="infoCard-text">{activeContent.text1}</p>
            )}

            {activeContent.text2 && (
              <p className="microcopy">{activeContent.text2}</p>
            )}

            {activeContent.img && (
              <img
                className={activeContent.imgClass || "info-card-img"}
                src={activeContent.img}
                alt=""
              />
            )}

            {activeContent.popupTriggerImg && (
              <button
                className={
                  activeContent.popupTriggerClass || "img-popup-trigger"
                }
                onClick={() => {
                  completeEiffelPage(1);

                  setProgress({
                    popupContent: {
                      image: swords,
                      text: activeContent.popupText,
                    },
                  });
                }}
              >
                <img src={activeContent.popupTriggerImg} alt="פתח מידע נוסף" />
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

{popupContent && (
  <div
    className="fullscreen-popup"
    onClick={() => setProgress({ popupContent: null })}
  >
    <div
      className="popup-card"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="popup-card-close"
        onClick={() => setProgress({ popupContent: null })}
      >
        ×
      </button>

      {popupContent.image && (
        <img
          className="popup-card-title-img"
          src={popupContent.image}
          alt=""
        />
      )}

      <p>{popupContent.text}</p>
    </div>
  </div>
)}

      <div className="intro-general-nav">
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

export default EnteringRequest;
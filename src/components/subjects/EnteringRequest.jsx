import React, { useState } from "react";
import ParisBackground from "../../components/backgroundsSvg/ParisBackground";
import CoffeeTable from "../../components/CoffeeTable";
import EiffelFlow from "../../components/EiffelFlow";
import LampPages from "../../components/LampPages";
import "../../css/EnteringRequest.css";

import dayelet from "../../assets/images/dayelet.svg";
import bubbleTalkDayelet from "../../assets/images/bubbleTalkDayelet.svg";

import warComment from "../../assets/images/enteringRequest/warComment1.svg";
import eiffelSide from "../../assets/images/enteringRequest/eiffelSide.svg";
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png";
import flowChart from "../../assets/images/enteringRequest/flowChart.svg";
import pressWar from "../../assets/images/enteringRequest/pressWar.svg";
import swords from "../../assets/images/enteringRequest/swords.png";

function EnteringRequest({ onNext }) {
  const [activeItem, setActiveItem] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);
  const [eiffelPage, setEiffelPage] = useState(0);
  const [popupContent, setPopupContent] = useState(null);
  

  const steps = ["cafe", "eiffel", "lamp"];

  const content = {
    cafe: {
      title: "הזנת בקשה",
      text1:
        "חו”ל בדיגיטל - מאפשר לחיילי חובה ואנשי קבע להגיש בקשת יציאה לחו”ל בדיגיטל באזור האישי באתר צה”ל ואישור המפקד יבוצע במערכת אנשים.",
      text2: "-לחצו על הקוראסונים-",
      component: <CoffeeTable />,
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
          component: <EiffelFlow />,
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
      component: <LampPages />,
    },
  };

  const handleItemClick = (item) => {
    const itemIndex = steps.indexOf(item);

    // מותר ללחוץ רק על פריטים שכבר נפתחו,
    // או על הפריט הבא בתור
    if (itemIndex > currentStep) return;

    setActiveItem(item);

    if (item === "eiffel") {
      setEiffelPage(0);
    }

    setCompletedItems((prev) => (prev.includes(item) ? prev : [...prev, item]));

    // אם לחצו על הפריט הנוכחי, פותחים את הבא
    if (itemIndex === currentStep) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleModalAction = () => {
    if (activeItem === "eiffel" && eiffelPage === 0) {
      setEiffelPage(1);
      return;
    }

    setActiveItem(null);
  };

  const handleBack = () => {
    if (activeItem === "eiffel" && eiffelPage > 0) {
      setEiffelPage((prev) => prev - 1);
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

  <img
    src={bubbleTalkDayelet}
    alt=""
    className="bubble-talk-dayelet"
  />

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

            <button className="close-button" onClick={handleModalAction}>
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
                onClick={() =>
                  setPopupContent({
                    image: swords,
                    text: activeContent.popupText,
                  })
                }
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
  <div className="fullscreen-popup">
    <div className="popup-card">
      <button
        className="popup-card-close"
        onClick={() => setPopupContent(null)}
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

      <button className="plane-button" onClick={onNext}>
        ✈
      </button>
    </div>
  );
}

export default EnteringRequest;

import React, { useState } from "react";
import ParisBackground from "../../components/backgroundsSvg/ParisBackground";
import CoffeeTable from "../../components/CoffeeTable";
import EiffelFlow from "../../components/EiffelFlow";
import "../../css/EnteringRequest.css";

import warComment from "../../assets/images/enteringRequest/warComment1.svg"
import eiffelSide from "../../assets/images/enteringRequest/eiffelSide.svg"
import backBtnDiv from "../../assets/images/enteringRequest/backBtnDiv.png"
import flowChart from "../../assets/images/enteringRequest/flowChart.svg"

function EnteringRequest({ onNext }) {
  const [activeItem, setActiveItem] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);
  const [eiffelPage, setEiffelPage] = useState(0);

  const steps = ["cafe", "eiffel", "lamp"];

  const content = {
    cafe: {
      title: "הזנת בקשה",
      text1: "חו”ל בדיגיטל - מאפשר לחיילי חובה ואנשי קבע להגיש בקשת יציאה לחו”ל בדיגיטל באזור האישי באתר צה”ל ואישור המפקד יבוצע במערכת אנשים.",
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
          text1:
            "בעמוד זה אפשר להוסיף הסבר נוסף על המשך התהליך, אישור המפקדים או השלבים לאחר פתיחת הבקשה.",
          img: flowChart,
          imgClass: "flowChart-img",
        },
      ],
    },
    lamp: {
      title: "הזנת בקשה",
      text1: "כאן יופיע ההסבר השלישי על שליחת הבקשה.",
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
  
    setCompletedItems((prev) =>
      prev.includes(item) ? prev : [...prev, item]
    );
  
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
      <p className="infoCard-text">{activeContent.text1}</p>

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

      {activeContent.component && (
        <div className="info-card-component">
          {activeContent.component}
        </div>
      )}
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
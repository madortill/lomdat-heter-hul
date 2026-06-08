import React, { useState } from "react";
import ParisBackground from "../../components/backgroundsSvg/ParisBackground";
import CoffeeTable from "../../components/CoffeeTable";
import "../../css/EnteringRequest.css";

function EnteringRequest({ onNext }) {
  const [activeItem, setActiveItem] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedItems, setCompletedItems] = useState([]);

  const steps = ["cafe", "eiffel", "lamp"];

  const content = {
    cafe: {
      title: "הזנת בקשה",
      text1: "חו”ל בדיגיטל - מאפשר לחיילי חובה ואנשי קבע להגיש בקשת יציאה לחו”ל בדיגיטל באזור האישי באתר צה”ל ואישור המפקד יבוצע במערכת אנשים.",
      text2: "-לחצו על הקוראסונים-",
      component: <CoffeeTable />,
    },
    eiffel: {
      title: "הזנת בקשה",
      text1: "כאן יופיע ההסבר השני על מילוי פרטי הבקשה.",
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
  
    setCompletedItems((prev) =>
      prev.includes(item) ? prev : [...prev, item]
    );
  
    // אם לחצו על הפריט הנוכחי, פותחים את הבא
    if (itemIndex === currentStep) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  return (
    <div className="subject-page">
<ParisBackground
  onItemClick={handleItemClick}
  currentStep={currentStep}
  completedItems={completedItems}
/>

      {activeItem && (
        <div className="info-overlay" onClick={() => setActiveItem(null)}>
          <div className="info-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setActiveItem(null)}
            >
              ×
            </button>

            <h2>{content[activeItem].title}</h2>
            <p className="infoCard-text">{content[activeItem].text1}</p>
            <p className="microcopy">{content[activeItem].text2}</p>
            {content[activeItem].component && (
  <div className="info-card-component">
    {content[activeItem].component}
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
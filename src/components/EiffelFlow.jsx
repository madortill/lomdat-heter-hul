import React, { useEffect, useState } from "react";
import arrowImg from "../assets/images/enteringRequest/arrowCute.png"; // תשני לנתיב שלך

function EiffelFlow({ onComplete, isCompleted }) {
  const steps = [
    {
      title: "שלב ראשון",
      text: 'פתיחת הבקשה ע"י הפרט באתר צה"ל',
    },
    {
      title: "שלב שני",
      text: "נפתחה משימה למפקד ממליץ שהינו מפקד ישיר",
    },
    {
      title: "שלב שלישי",
      text: 'נפתחה משימה למפקד מאשר בדרגת רס"ן ומעלה',
    },
    {
      title: "שלב רביעי",
      text: "קבלת הודעה לפרט ולמפקד על אישור / שלילת הבקשה",
    },
  ];

  const [visibleSteps, setVisibleSteps] = useState(
    isCompleted ? steps.length : 0
  );

  useEffect(() => {
    if (isCompleted) {
      setVisibleSteps(steps.length);
      return;
    }
  
    let current = 0;
  
    const interval = setInterval(() => {
      current += 1;
      setVisibleSteps(current);
  
      if (current >= steps.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 700);
  
    return () => clearInterval(interval);
  }, [isCompleted]);

  return (
    <div className="eiffel-flow">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {visibleSteps > index && (
            <div className="flow-step fade-in-step">
              <h3 className="flow-step-title">{step.title}</h3>
              <p className="flow-step-text">{step.text}</p>
            </div>
          )}

          {visibleSteps > index + 1 && index < steps.length - 1 && (
            <div className="flow-arrow fade-in-step">
              <img src={arrowImg} alt="" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default EiffelFlow;
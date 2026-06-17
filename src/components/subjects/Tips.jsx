import React from "react";
import "../../css/IntroPage.css";
import "../../css/Tips.css";

import nextBtnText from "../../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";
import cloud from "../../assets/images/openingPage/cloud.png";

import PlaneTips from "../../components/PlaneTips";

import miniPlane from "../../assets/images/tips/miniPlane.png";

const tipsData = {
  header: "טיפים חשובים לפני שממריאים",
  text: "לחצו על המטוסים",
  drives: [
    {
      title: "טיפ 1",
      description: "יש לנהל טבלת ב״מ על בקשות חו״ל הנפתחות בדיגיטל.",
      car: miniPlane,
    },
    {
      title: "טיפ 2",
      description: "ודאו שכל הפרטים בבקשה תואמים לפרטי החייל ולתאריכים שהוזנו.",
      car: miniPlane,
    },
    {
      title: "טיפ 3",
      description: "במקרה של שינוי לאחר תחילת ההיתר, יש לפעול לפי הנהלים ולעדכן ידנית.",
      car: miniPlane,
    },
    {
      title: "טיפ 4",
      description: "חשוב לתעד באסמכתא כל פעולה חריגה שבוצעה בתהליך.",
      car: miniPlane,
    },
    {
      title: "טיפ 5",
      description: "לפני סגירת טיפול, ודאו שהבקשה הושלמה ושאין חוסרים.",
      car: miniPlane,
    },
  ],
};

function Tips({ onBack, onNext }) {
  return (
    <div className="tips">
      <div className="intro-clouds">
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud1" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud2" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud3" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud4" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud5" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud6" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud7" />
      </div>

      <h1 className="tips-title">{tipsData.header}</h1>
      <p className="tips-subtitle">-{tipsData.text}-</p>

      <PlaneTips data={tipsData} wasCompleted={false} unlock={() => {}} />

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
          className="intro-general-btn intro-general-next"
          onClick={onNext}
        />
      </div>
    </div>
  );
}

export default Tips;
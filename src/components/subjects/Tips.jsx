import React from "react";
import "../../css/IntroPage.css";
import "../../css/Tips.css";

import nextBtnText from "../../assets/images/introPage/endBtnText.svg";
import backBtnText from "../../assets/images/introPage/backBtnText.svg";
import cloud from "../../assets/images/openingPage/cloud.png";

import PlaneTips from "../../components/PlaneTips";

import miniPlane from "../../assets/images/tips/miniPlane.png";

const tipsData = {
  header: "טיפים חשובים לפני שממריאים",
  text: "לחצו על כל המטוסים כדי להמשיך",
  drives: [
    {
      title: "טיפ 1",
      description: "יש לנהל טבלת בו״ם על בקשות חו״ל הנפתחות בדיגיטל.",
      car: miniPlane,
    },
    {
      title: "טיפ 2",
      description:
        "יש לשים לב כי ישנן הגבלות שונות עבור טיסות למדינות מסויימות המתעדכנות מעת לעת ועל כן יש להיות בבקרה.",
      car: miniPlane,
    },
    {
      title: "טיפ 3",
      description:
        'יש ליצור מנגנוני בקרה וליצור נוהל יציאה לחו"ל ביחידה - כאשר חייל משנה תאריכי טיסה עליו לעדכן את משרד המשא"ן במיידי על מנת למנוע אצלנו פער.',
      car: miniPlane,
    },
    {
      title: "טיפ 4",
      description: "לעולם לא להבטיח לחייל שבקשתו תאושר, ולהדגיש זאת גם למפקדים בדגש בזמן מלחמה והנחיות נשנות.",
      car: miniPlane,
    },
    {
      title: "טיפ 5",
      description: 'לעולם לא לאפשר יציאה לחו"ל לקבוצת לוחמים גדולה/ מפקדים לאור המצב הביטחוני שאינו מבטיח את ביטחוננו בהיבט הפעלת היחידה ללחימה.',
      car: miniPlane,
    },
  ],
};

function Tips({ onBack, onNext, tipsCompleted, onCompleteTips }) {
  const handleNext = () => {
    if (!tipsCompleted) return;
    onNext?.();
  };

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

      <p className="tips-subtitle">
        {tipsCompleted ? "-כל הטיפים נפתחו, אפשר להמשיך-" : `-${tipsData.text}-`}
      </p>

      <PlaneTips
        data={tipsData}
        wasCompleted={tipsCompleted}
        unlock={onCompleteTips}
      />

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
            tipsCompleted ? "" : "disabled-general-btn no-mouse-events"
          }`}
          onClick={tipsCompleted ? handleNext : undefined}
        />
      </div>
    </div>
  );
}

export default Tips;
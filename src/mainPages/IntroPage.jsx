import React, { useState } from "react";
import "../css/IntroPage.css";
import planeText from "../assets/images/introPage/planeText.svg";
import nextBtnText from "../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../assets/images/introPage/backBtnText.svg";
import dayeletPlane from "../assets/images/introPage/dayeletPlane.svg";
import nextBubble from "../assets/images/introPage/nextBubble.png";
import cloud from "../assets/images/openingPage/cloud.png";

const bubbleTexts = [
  "היי! אני אהיה הדיילת שלכם במסע להיתר טופס חול! במהלך הלומדה נעבור בין המדינות השונות ונלמד עוד נושאים הקשורים להיתר חול! בטוחה שתעזרו לי להשלים את המסע בהצלחה!",
  "חייל בשירות חובה ובשירות קבע רשאי לצאת לחול במהלך שירותו הצבאי במסגרת מגבלות ימי החופשה להם זכאי ובסופי שבוע וחגים. זכאות זו כפופה לאישור מפקדים, ולאישור גורמים נוספים כפי שיפורט להלן.",
  "יש גם אופציה של בקשת היתר חו”ל בדיגיטל. דבר המאפשר לחיילי חובה ואנשי קבע להגיש בקשת יציאה לחו”ל בדיגיטל באזור האישי באתר צה”ל ואישור המפקד יבוצע במערכת אנשים.",
  "יש לוודא כי הזנת ההיתר תתבצע עד יום אחד לפחות לפני יציאתו של הפרט לחו”ל.",
];

const introPages = ["planeTextPage", "dayeletBubblePage"];

function IntroPage({ onNext }) {
  const [currentIntroPage, setCurrentIntroPage] = useState(0);
  const [currentBubbleText, setCurrentBubbleText] = useState(0);

  const isFirstIntroPage = currentIntroPage === 0;
  const isLastIntroPage = currentIntroPage === introPages.length - 1;

  const isFirstText = currentBubbleText === 0;
  const isLastText = currentBubbleText === bubbleTexts.length - 1;

  const handleNextIntroPage = () => {
    if (!isLastIntroPage) {
      setCurrentIntroPage(currentIntroPage + 1);
      return;
    }

    if (isLastIntroPage && isLastText) {
      onNext();
    }
  };

  const handleBackIntroPage = () => {
    if (!isFirstIntroPage) {
      setCurrentIntroPage(currentIntroPage - 1);
    }
  };

  const handleNextBubbleText = () => {
    if (!isLastText) {
      setCurrentBubbleText(currentBubbleText + 1);
    }
  };

  const handleBackBubbleText = () => {
    if (!isFirstText) {
      setCurrentBubbleText(currentBubbleText - 1);
    }
  };

  return (
    <div className="introPage">
      <div className="intro-clouds">
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud1" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud2" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud3" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud4" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud5" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud6" />
        <img src={cloud} alt="cloud" className="intro-cloud intro-cloud7" />
      </div>

      {currentIntroPage === 0 && (
        <div className="container-intro page1">
          <img src={planeText} alt="planeText" className="plane-text" />
        </div>
      )}

      {currentIntroPage === 1 && (
        <div className="container-intro page2">
          <img src={dayeletPlane} alt="dayeletPlane" className="dayelet-plane" />

          <div className="bubble-nav-wrapper">
            <img
              src={nextBubble}
              alt="back"
              className={`nav-bubble next-bubble-left ${
                isFirstText ? "hidden-bubble-btn" : ""
              }`}
              onClick={!isFirstText ? handleBackBubbleText : undefined}
            />

            <div className="text-bubble-plane">
              <p className="inner-text-plane" dir="rtl">
                {bubbleTexts[currentBubbleText]}
              </p>
            </div>

            <img
              src={nextBubble}
              alt="next"
              className={`nav-bubble next-bubble-right ${
                isLastText ? "hidden-bubble-btn" : ""
              }`}
              onClick={!isLastText ? handleNextBubbleText : undefined}
            />
          </div>
        </div>
      )}

      <div className="intro-general-nav">
        <img
          src={backBtnText}
          alt="חזור"
          className={`intro-general-btn intro-general-back ${
            isFirstIntroPage ? "hidden-bubble-btn" : ""
          }`}
          onClick={!isFirstIntroPage ? handleBackIntroPage : undefined}
        />

        <img
          src={nextBtnText}
          alt="הבא"
          className={`intro-general-btn intro-general-next ${
            isLastIntroPage && !isLastText ? "disabled-general-btn" : ""
          }`}
          onClick={
            isLastIntroPage && !isLastText
              ? undefined
              : handleNextIntroPage
          }
        />
      </div>
    </div>
  );
}

export default IntroPage;
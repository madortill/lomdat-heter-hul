import React from "react";

import kevaImg from "../assets/images/enteringRequest/kevaImg.svg";
import hovaImg from "../assets/images/enteringRequest/hovaImg.svg";
import backBtnDiv from "../assets/images/enteringRequest/backBtnDiv.png";
import kevaStatement from "../assets/images/enteringRequest/kevaStatement.svg";
import cardIcon from "../assets/images/enteringRequest/cardIcon.svg";
import lampImg from "../assets/images/enteringRequest/lampImg.svg";

function LampPages({
  selectedType,
  setSelectedType,
  openCardsByType,
  setOpenCardsByType,
  completedTypes,
  onCompleteType,
}) {
  const cardsByType = {
    keva: [
      {
        color: "#FFEAC3",
        text: 'לתהליך זה נדרשת המלצת מפקד ישיר ואישור מפקד בדרגת סא"ל לנגדים וקצינים עד דרגת רס"ן.',
        img: cardIcon,
      },
      {
        color: "#FFEAC3",
        text: 'משרת הקבע יכנס לאזור האישי באתר צה"ל. במסגרת הבקשה ימלא את תאריכי הטיסה והחזרה לארץ, את מדינות היעד, ויעבור לומדת ביטחון מידע.',
        img: cardIcon,
      },
      {
        color: "#FFEAC3",
        text: "במידה ובקשתו של משרת הקבע תקינה - תאושר בקשתו באופן אוטומטי תוך 24 שעות.",
        img: cardIcon,
      },
      {
        color: "#FFEAC3",
        text: 'במידה ובקשתו אינה תקינה - תישלל באופן אוטומטי תוך 24 שעות, ומשרת הקבע יופנה למשרד המשא"ן ביחידה. סיבות אפשריות לשלילת הבקשה הינן מחסור בימי חופשה, מדינה לא מאושרת, אינדיקציית מצ"ח או חריגה.',
        img: cardIcon,
      },
    ],

    hova: [
      {
        color: "#54463A",
        text: 'לתהליך זה נדרשת המלצת מפקד ישיר (גורם ממליץ) ואישור מפקד בדרגת רס"ן ומעלה (גורם מאשר).',
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: 'הפרט ימלא בקשה באזור האישי בדיגיטל והבקשה תעבור במערכת לרשימת המשימות של המפקד הישיר ואז לאישור רס"ן.',
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: 'במסגרת הגשת הבקשה בדיגיטל ממלא החייל הצהרת שמירת פרטי שגרירות, אישור ב"ם, מילוי פרטי הבקשה.',
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: 'יש לשים דגש על עובדי משמרות היוצאים לחו"ל/ חיילים היוצאים לחופשה מיוחדת בחו"ל – עליהם למלא טופס ידני.',
        img: cardIcon,
        lightText: true,
      },
    ],
  };

  const typeVisuals = {
    keva: {
      character: kevaImg,
      statement: kevaStatement,
    },
    hova: {
      character: hovaImg,
      statement: null,
    },
  };

  const activeCards = selectedType ? cardsByType[selectedType] : [];
  const openCards = selectedType ? openCardsByType[selectedType] || [] : [];
  const activeVisuals = selectedType ? typeVisuals[selectedType] : null;

  const isKevaCompleted = completedTypes.includes("keva");
  const isHovaCompleted = completedTypes.includes("hova");
  const areBothCompleted = isKevaCompleted && isHovaCompleted;

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  const handleCardClick = (index) => {
    if (!selectedType) return;

    setOpenCardsByType((prev) => {
      const currentOpenCards = prev[selectedType] || [];

      const updatedCards = currentOpenCards.includes(index)
        ? currentOpenCards
        : [...currentOpenCards, index];

      if (updatedCards.length === cardsByType[selectedType].length) {
        onCompleteType?.(selectedType);
      }

      return {
        ...prev,
        [selectedType]: updatedCards,
      };
    });
  };

  return (
    <div className="lamp-pages">
      {!selectedType && (
        <div className="lamp-choice-page">
          <p className="lamp-page-text">
            {areBothCompleted
              ? "כל הכבוד! השלמתם גם קבע וגם חובה"
              : "כדי להשלים את העמוד, צריך לעבור גם על קבע וגם על חובה"}
          </p>

          <p className="lamp-page-subtext">לחצו על אחת הדמויות:</p>

          <div className="lamp-choice-wrapper">
            <button
              className={`lamp-choice-card ${
                isKevaCompleted ? "lamp-choice-completed" : "lamp-choice-needed"
              }`}
              onClick={() => handleSelectType("keva")}
            >
              {isKevaCompleted && <div className="lamp-choice-check">✔</div>}

       

              <img id="keva-img" src={kevaImg} alt="איש קבע" />
              <span>איש קבע</span>
            </button>

            <img src={lampImg} alt="lampImg" className="lamp-img" />

            <button
              className={`lamp-choice-card ${
                isHovaCompleted ? "lamp-choice-completed" : "lamp-choice-needed"
              }`}
              onClick={() => handleSelectType("hova")}
            >
              {isHovaCompleted && <div className="lamp-choice-check">✔</div>}


              <img src={hovaImg} alt="חייל חובה" />
              <span>חייל חובה</span>
            </button>
          </div>
        </div>
      )}

      {selectedType && (
        <div className="lamp-cards-page">
          <button className="lamp-back-btn" onClick={handleBack}>
            <img src={backBtnDiv} alt="backBtnDiv" />
          </button>

          <h3 className="lamp-subtitle">
            {selectedType === "keva" ? "איש קבע" : "חייל חובה"}
          </h3>

          <p className="lamp-note">- לחצו על כל הכרטיסיות -</p>

          <div
            className={`lamp-cards-wrapper ${
              selectedType === "keva" ? "keva-cards" : "hova-cards"
            }`}
          >
            {activeCards.map((card, index) => (
              <div
                key={index}
                className={`lamp-card ${
                  openCards.includes(index) ? "active" : ""
                } ${card.lightText ? "light-text" : ""}`}
                style={{ backgroundColor: card.color }}
                onClick={() => handleCardClick(index)}
              >
                <div className="lamp-card-content">
                  <img src={card.img} alt="" className="lamp-card-img" />

                  <div className="lamp-card-text">{card.text}</div>
                </div>
              </div>
            ))}
          </div>

          {activeVisuals && (
            <div className="lamp-side-wrapper">
              <img src={lampImg} alt="" className="side-lamp" />

              <img
                src={activeVisuals.character}
                alt=""
                className="side-character"
              />

              {activeVisuals.statement && (
                <img
                  src={activeVisuals.statement}
                  alt=""
                  className="keva-statement"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LampPages;
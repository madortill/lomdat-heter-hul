import React from "react";

/* תחליפי לנתיבים האמיתיים שלך */
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
        text: "כאן יופיע מלל לכרטיס השני של איש קבע.",
        img: cardIcon,
      },
      {
        color: "#FFEAC3",
        text: "כאן יופיע מלל לכרטיס השלישי של איש קבע.",
        img: cardIcon,
      },
      {
        color: "#FFEAC3",
        text: "כאן יופיע מלל לכרטיס הרביעי של איש קבע.",
        img: cardIcon,
      },
    ],

    hova: [
      {
        color: "#54463A",
        text: "כאן יופיע מלל לכרטיס הראשון של חייל חובה.",
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: "כאן יופיע מלל לכרטיס השני של חייל חובה.",
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: "כאן יופיע מלל לכרטיס השלישי של חייל חובה.",
        img: cardIcon,
        lightText: true,
      },
      {
        color: "#54463A",
        text: "כאן יופיע מלל לכרטיס הרביעי של חייל חובה.",
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
          <p className="lamp-page-text">לחצו על אחת הדמויות:</p>

          <div className="lamp-choice-wrapper">
            <button
              className="lamp-choice-card"
              onClick={() => handleSelectType("keva")}
            >
              <img id="keva-img" src={kevaImg} alt="איש קבע" />
              <span>איש קבע</span>
            </button>

            <img src={lampImg} alt="lampImg" className="lamp-img" />

            <button
              className="lamp-choice-card"
              onClick={() => handleSelectType("hova")}
            >
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

          <p className="lamp-note">- לחצו על הכרטיסיות -</p>

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
import React, { useState } from "react";
import phone from "../assets/images/digitalProcedure/phone.png";

const numberPositions = {

    1: { top: "6.15rem", left: "7.7rem" },
    2: { top: "6.15rem", left: "9.1rem" },
    3: { top: "6.15rem", left: "10.5rem" },
  
    4: { top: "7.5rem", left: "7.7rem" },
    5: { top: "7.5rem", left: "9.1rem" },
    6: { top: "7.5rem", left: "10.5rem" },
  
    7: { top: "8.85rem", left: "7.7rem" },
    8: { top: "8.85rem", left: "9.1rem" },
    9: { top: "8.85rem", left: "10.5rem" },
  
    0: { top: "10.2rem", left: "9.1rem" },
  
  };

const gameData = {
  hova: {
    sequence: [3, 5, 1],
  },
  keva: {
    sequence: [7, 2, 9],
  },
};

function PhoneClicks({ type = "hova", onComplete, successText }) {
  const currentGame = gameData[type];

  const [animationStarted, setAnimationStarted] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [currentClickIndex, setCurrentClickIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(false);

  const startAnimation = () => {
    if (completed) return;

    setAnimationStarted(true);
    setAnimationFinished(false);
    setHighlightedIndex(null);
    setCurrentClickIndex(0);
    setMessage("");

    currentGame.sequence.forEach((number, index) => {
      setTimeout(() => {
        setHighlightedIndex(index);
      }, index * 900);
    });

    setTimeout(() => {
      setHighlightedIndex(null);
      setAnimationFinished(true);
      setMessage("עכשיו לחצו על המספרים לפי הסדר שראיתם");
    }, currentGame.sequence.length * 900 + 500);
  };

  const handleNumberClick = (number) => {
    if (!animationFinished || completed) return;

    const expectedNumber = currentGame.sequence[currentClickIndex];

    if (number !== expectedNumber) {
      setMessage("לא לפי הסדר, נסו שוב מההתחלה");
      setCurrentClickIndex(0);
      return;
    }

    const nextClickIndex = currentClickIndex + 1;

    if (nextClickIndex === currentGame.sequence.length) {
      setCompleted(true);
      setAnimationFinished(false);
      setMessage(successText);
      onComplete?.();
      return;
    }

    setCurrentClickIndex(nextClickIndex);
  };

  return (
    <div className="phone-clicks-wrapper">
      {!animationStarted && !completed && (
        <button
          type="button"
          className="phone-start-animation-button"
          onClick={startAnimation}
        >
          התחל אנימציה
        </button>
      )}

      {/* {animationStarted && !animationFinished && !completed && (
        <p className="phone-clicks-message">שימו לב לסדר המספרים...</p>
      )} */}

      <div className="game-phone-container">
        <img src={phone} alt="phone" className="phone-img" />

        <div className="phone-buttons-layer">
          {Object.entries(numberPositions).map(([number, position]) => {
            const numericNumber = Number(number);
            const highlightedNumber =
              highlightedIndex !== null
                ? currentGame.sequence[highlightedIndex]
                : null;

            const isHighlighted = numericNumber === highlightedNumber;

            return (
              <button
                key={number}
                type="button"
                className={`phone-number-button ${
                  isHighlighted ? "phone-number-highlighted" : ""
                }`}
                style={{
                  top: position.top,
                  left: position.left,
                }}
                onClick={() => handleNumberClick(numericNumber)}
                aria-label={`ספרה ${number}`}
              />
            );
          })}
        </div>
        {message && (
    <div
      className={`phone-message-box ${
        completed ? "phone-clicks-success-message" : ""
      }`}
    >
      {message}
    </div>
  )}
      </div>

      {animationFinished && !completed && (
        <button
          type="button"
          className="phone-start-animation-button"
          onClick={startAnimation}
        >
          צפייה חוזרת באנימציה
        </button>
      )}
    </div>
  );
}

export default PhoneClicks;
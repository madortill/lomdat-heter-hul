import React, { useEffect, useMemo, useState } from "react";

import FruitBasketSvgHova from "../components/FruitBasketSvgHova";
import FruitBasketSvgKeva from "../components/FruitBasketSvgKeva";

import coconut from "../assets/images/practice/coconut.png";
import dragonFruit from "../assets/images/practice/dragonFruit.png";
import mango from "../assets/images/practice/mango.png";
import pineapple from "../assets/images/practice/pineapple.png";

const fruitImages = {
  mango,
  dragonFruit,
  pineapple,
  coconut,
};

const fruitLabels = {
  mango: "מנגו",
  dragonFruit: "דרגון פרוט",
  pineapple: "אננס",
  coconut: "קוקוס",
};

const practiceData = {
  hova: {
    successText: "כל הכבוד! השלמתם את סדר הנוהל הידני לחיילי חובה.",
    steps: [
      {
        id: "submitRequest",
        title: "שלב ראשון",
        text: "הגשת בקשה ליציאה לחו״ל באזור האישי.",
        fruit: "mango",
      },
      {
        id: "commanderApproval",
        title: "שלב שני",
        text: "קבלת אישור וחתימת מפקד.",
        fruit: "coconut",
      },
      {
        id: "mashanCheck",
        title: "שלב שלישי",
        text: "בדיקת משרד המשא״ן את הבקשה.",
        fruit: "mango",
      },
      {
        id: "securityApproval",
        title: "שלב רביעי",
        text: "קבלת אישור ביטחון מידע.",
        fruit: "dragonFruit",
      },
      {
        id: "finalApproval",
        title: "שלב חמישי",
        text: "אישור יציאה לחו״ל על ידי הסמכות המאשרת.",
        fruit: "coconut",
      },
      {
        id: "statusUpdate",
        title: "שלב שישי",
        text: "עדכון סטטוס הבקשה באזור האישי.",
        fruit: "pineapple",
      },
      {
        id: "flightReady",
        title: "שלב שביעי",
        text: "קבלת אישור סופי ויציאה לחופשה.",
        fruit: "dragonFruit",
      },
    ],
  },

  keva: {
    successText: "כל הכבוד! השלמתם את סדר הנוהל הידני לאנשי קבע.",
    steps: [
      {
        id: "submitRequest",
        title: "שלב ראשון",
        text: "הגשת בקשה ליציאה לחו״ל במערכת הרלוונטית.",
        fruit: "pineapple",
      },
      {
        id: "commanderApproval",
        title: "שלב שני",
        text: "קבלת אישור מפקד לתקופת החופשה.",
        fruit: "mango",
      },
      {
        id: "mashanCheck",
        title: "שלב שלישי",
        text: "בדיקת משרד המשא״ן את פרטי הבקשה.",
        fruit: "dragonFruit",
      },
      {
        id: "securityApproval",
        title: "שלב רביעי",
        text: "בדיקת צורך באישור ביטחון מידע.",
        fruit: "coconut",
      },
      {
        id: "finalApproval",
        title: "שלב חמישי",
        text: "אישור יציאה לחו״ל על ידי הגורם המאשר.",
        fruit: "pineapple",
      },
      {
        id: "flightReady",
        title: "שלב שישי",
        text: "קבלת אישור סופי לפני היציאה לחו״ל.",
        fruit: "dragonFruit",
      },
    ],
  },
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getOptionsForStep(steps, currentStepIndex) {
  const correctStep = steps[currentStepIndex];

  const options = [correctStep];
  const usedFruitIds = new Set([correctStep.fruit]);
  const usedStepIds = new Set([correctStep.id]);

  const addOptionIfPossible = (step) => {
    if (options.length >= 3) return;
    if (usedStepIds.has(step.id)) return;
    if (usedFruitIds.has(step.fruit)) return;

    options.push(step);
    usedStepIds.add(step.id);
    usedFruitIds.add(step.fruit);
  };

  const futureSteps = steps.filter((step, index) => index > currentStepIndex);
  shuffleArray(futureSteps).forEach(addOptionIfPossible);

  if (options.length < 3) {
    const allOtherSteps = steps.filter(
      (step, index) => index !== currentStepIndex
    );

    shuffleArray(allOtherSteps).forEach(addOptionIfPossible);
  }

  return shuffleArray(options);
}

function FruitBasket({ type = "hova", isCompleted = false, onComplete }) {
  const currentPractice = useMemo(() => practiceData[type], [type]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [clickedFruits, setClickedFruits] = useState([]);
  const [options, setOptions] = useState(() =>
    getOptionsForStep(currentPractice.steps, 0)
  );
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(isCompleted);

  const activeStepNumber = currentStepIndex + 1;
  const totalSteps = currentPractice.steps.length;

  const orderedCompletedSteps = completed
    ? currentPractice.steps
    : currentPractice.steps.slice(0, clickedFruits.length);

  useEffect(() => {
    if (isCompleted) {
      setCompleted(true);
      setCurrentStepIndex(totalSteps - 1);
      setSelectedSteps(currentPractice.steps.map((step) => step.id));
      setClickedFruits(currentPractice.steps.map((step) => step.fruit));
      setMessage("");
      setOptions([]);
      return;
    }

    setCompleted(false);
    setCurrentStepIndex(0);
    setSelectedSteps([]);
    setClickedFruits([]);
    setMessage("");
    setOptions(getOptionsForStep(currentPractice.steps, 0));
  }, [isCompleted, type, currentPractice, totalSteps]);

  const handleOptionClick = (stepOption) => {
    if (completed) return;

    const correctStep = currentPractice.steps[currentStepIndex];

    if (stepOption.id !== correctStep.id) {
      setMessage("לא נכון, נסו שוב. חשבו מה השלב הבא בתהליך.");
      return;
    }

    const updatedSelectedSteps = [...selectedSteps, stepOption.id];
    const updatedClickedFruits = [...clickedFruits, stepOption.fruit];
    const nextStepIndex = currentStepIndex + 1;

    setSelectedSteps(updatedSelectedSteps);
    setClickedFruits(updatedClickedFruits);
    setMessage("");

    if (nextStepIndex === totalSteps) {
      setCompleted(true);
      setMessage("");
      setOptions([]);
      onComplete?.();
      return;
    }

    setCurrentStepIndex(nextStepIndex);
    setOptions(getOptionsForStep(currentPractice.steps, nextStepIndex));
  };

  return (
    <div className="fruit-basket-wrapper">
      <div className="fruit-practice-title">
        {!completed ? (
          <p>
            שלב {activeStepNumber} מתוך {totalSteps}
          </p>
        ) : (
          <div className="fruit-completed-steps">
            {orderedCompletedSteps.map((step, index) => (
              <span key={step.id} className="fruit-completed-step">
                {index + 1}. {step.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {!completed && (
        <div className="fruit-options-row">
          {options.map((stepOption) => {
            const fruitId = stepOption.fruit;

            return (
              <button
                key={stepOption.id}
                type="button"
                className="fruit-option-card"
                onClick={() => handleOptionClick(stepOption)}
              >
                <img
                  src={fruitImages[fruitId]}
                  alt={fruitLabels[fruitId]}
                  className="fruit-option-img"
                />

                <span className="fruit-option-stage">
                  {stepOption.title}
                </span>

                <span className="fruit-option-text">
                  {stepOption.text}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="fruit-basket-area">
        {type === "keva" ? (
          <FruitBasketSvgKeva clickedFruits={clickedFruits} />
        ) : (
          <FruitBasketSvgHova clickedFruits={clickedFruits} />
        )}
      </div>

      {message && (
        <p
          className={`fruit-basket-message ${
            completed ? "fruit-basket-success-message" : ""
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default FruitBasket;
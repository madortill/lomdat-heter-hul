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
          title: "כניסה לאזור האישי",
          text: "חייל החובה נכנס ומזדהה באזור האישי לצורך פתיחת הבקשה.",
          fruit: "mango",
        },
        {
          id: "commanderApproval",
          title: "מילוי פרטי הבקשה",
          text: "הפרט ממלא את תאריכי הנסיעה, יעד החופשה ופרטי איש קשר בארץ.",
          fruit: "coconut",
        },
      {
        id: "mashanCheck",
        title: "הצהרת הפרט",
        text: "הפרט מאשר שיש בידיו את פרטי ההתקשרות של השגרירות במדינת היעד.",
        fruit: "mango",
      },
      {
        id: "securityApproval",
        title: "אישור בטחון מידע",
        text: "הפרט צופה בסרטון ביטחון מידע ועונה בהצלחה על שאלות האישור.",
        fruit: "dragonFruit",
      },
      {
        id: "finalApproval",
        title: "אישור מילוי פרטי הבקשה",
        text: "לאחר מילוי הפרטים, הבקשה נקלטת ומועברת לסטטוס ממתין לאישור.",
        fruit: "coconut",
      },
      {
        id: "statusUpdate",
        title: "אישור מפקד",
        text: 'הבקשה מועברת לאישור מפקד בדרגת רס"ן לפחות.',
        fruit: "pineapple",
      },
      {
        id: "flightReady",
        title: "אישור/דחיה של הבקשה",
        text: "הפרט מקבל עדכון האם הבקשה אושרה או נדחתה.",
        fruit: "dragonFruit",
      },
    ],
  },

  keva: {
    successText: "כל הכבוד! השלמתם את סדר הנוהל הדיגיטלי לאנשי קבע.",
    steps: [
      {
        id: "submitRequest",
        title: "כניסה לאזור האישי",
        text: "איש הקבע נכנס ומזדהה באזור האישי לצורך פתיחת הבקשה.",
        fruit: "pineapple",
      },
      {
        id: "commanderApproval",
        title: "מילוי פרטי הבקשה",
        text: "הפרט ממלא תאריכים, יעד חופשה, מדינות נוספות ופרטי איש קשר בארץ.",
        fruit: "mango",
      },
      {
        id: "mashanCheck",
        title: "הצהרת הפרט",
        text: 'הפרט מצהיר שאישר מול מפקד בדרגת סא"ל ומעלה ושיש בידיו פרטי שגרירות.',
        fruit: "dragonFruit",
      },
      {
        id: "securityApproval",
        title: "אישור בטחון מידע",
        text: "הפרט צופה בסרטון ביטחון מידע ועונה בהצלחה על שאלות האישור.",
        fruit: "coconut",
      },
      {
        id: "finalApproval",
        title: "אישור מילוי פרטי הבקשה",
        text: 'לאחר השלמת התהליך, הבקשה נקלטת ומתעדכנת במערכת "אנשים".',
        fruit: "pineapple",
      },
      {
        id: "flightReady",
        title: "אישור/דחיה של הבקשה",
        text: "תוך 24 שעות הפרט מקבל עדכון האם הבקשה אושרה או נדחתה.",
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
import React from "react";

import pizzaBase from "../assets/images/manualProcedure/pizzaBase.svg";
import pizzaSause from "../assets/images/manualProcedure/pizzaSause.svg";
import pizzaCheese from "../assets/images/manualProcedure/pizzaCheese.svg";
import pizzaMushrooms from "../assets/images/manualProcedure/pizzaMushrooms.svg";
import pizzaOlives from "../assets/images/manualProcedure/pizzaOlives.svg";
import pizzaLeaves from "../assets/images/manualProcedure/pizzaLeaves.svg";
import pizzaTray from "../assets/images/manualProcedure/pizzaTray.png";

function PizzaTopics({
  type = "hova",
  addedTopics = [],
  setAddedTopics,
  selectedTopic = null,
  setSelectedTopic,
  onComplete,
}) {
  const hovaTopics = [
    {
      id: "base",
      label: "סמכות אישור יציאה לחו״ל",
      icon: pizzaBase,
      layer: pizzaBase,
      text: 'מפקד ממליץ - מפקד ישיר מפקד מאשר - דרגת רס"ן.',
    },
    {
      id: "sauce",
      label: "אופן דיווח חתימת מפקד",
      icon: pizzaSause,
      layer: pizzaSause,
      text: 'מנוהל על-גבי טופס בקשה ליציאה לחו"ל, המפקד הממליץ ומפקד מאשר חותמים באופן ידני על-גבי הטופס ומשרד המשא"ן שומר את הטופס כאסמכתא',
    },
    {
      id: "cheese",
      label: "אישור ביטחון מידע",
      icon: pizzaCheese,
      layer: pizzaCheese,
      text: "נדרש בחתימה של משרד בטחון מידע על-גבי טופס הבקשה",
    },
    {
      id: "mushrooms",
      label: "פעולות של משרד המשא״ן",
      icon: pizzaMushrooms,
      layer: pizzaMushrooms,
      text: 'משרד המשא"ן מזין את פרטי הטופס במערכת "אנשים". על ההזנה לכלול את כלל פרטי ההיתר כולל מדינות שהיה.',
    },
    {
      id: "leaves",
      label: "עיתוי הגשת הבקשה",
      icon: pizzaLeaves,
      layer: pizzaLeaves,
      text: 'ע"פ הפקודות חייל נדרש להגיש בקשת היתר יציאה לחו"ל 21 ימים לפחות ממועד היציאה',
    },
  ];

  const kevaTopics = [
    {
      id: "base",
      label: "סמכות אישור יציאה לחו״ל",
      icon: pizzaBase,
      layer: pizzaBase,
      text: 'נגדים וקצינים עד לדרגת רס"ן – סמכות סא"ל לאישור.',
    },
    {
      id: "sauce",
      label: "אופן דיווח חתימת מפקד",
      icon: pizzaSause,
      layer: pizzaSause,
      text: 'מנוהל על-גבי טופס בקשה ליציאה לחו"ל, המפקד הישיר ומפקד סא"ל חותמים באופן ידני על-גבי הטופס ומשרד המשא"ן שומר את הטופס כאסמכתא',
    },
    {
      id: "cheese",
      label: "אישור ביטחון מידע",
      icon: pizzaCheese,
      layer: pizzaCheese,
      text: "נדרש בחתימה של משרד בטחון מידע על-גבי טופס הבקשה",
    },
    {
      id: "olives",
      label: "פעולות של משרד המשא״ן",
      icon: pizzaOlives,
      layer: pizzaOlives,
      text: 'משרד המשא"ן מזין את פרטי הטופס במערכת "אנשים" ושומר עותק ממנו כאסמכתא',
    },
  ];

  const topics = type === "keva" ? kevaTopics : hovaTopics;

  const safeAddedTopics = addedTopics || [];
  const activeTopic = topics.find((topic) => topic.id === selectedTopic);

  const nextTopicIndex = safeAddedTopics.length;
  const nextTopic = topics[nextTopicIndex];

  const isTopicAdded = (topicId) => safeAddedTopics.includes(topicId);

  const isTopicNext = (topicId) => {
    return nextTopic?.id === topicId;
  };

  const isTopicAvailable = (topicId) => {
    return isTopicAdded(topicId) || isTopicNext(topicId);
  };

  const addTopicToPizza = (topicId) => {
    const topicExists = topics.some((topic) => topic.id === topicId);
    if (!topicExists) return;

    const topicAlreadyAdded = safeAddedTopics.includes(topicId);

    if (topicAlreadyAdded) {
      setSelectedTopic(topicId);
      return;
    }

    if (!isTopicNext(topicId)) {
      return;
    }

    setSelectedTopic(topicId);

    setAddedTopics((prev) => {
      const currentTopics = prev || [];

      if (currentTopics.includes(topicId)) {
        return currentTopics;
      }

      const updatedTopics = [...currentTopics, topicId];

      if (updatedTopics.length === topics.length) {
        onComplete?.();
      }

      return updatedTopics;
    });
  };

  const handleDragStart = (event, topicId) => {
    if (!isTopicAvailable(topicId)) {
      event.preventDefault();
      return;
    }

    if (!isTopicNext(topicId) && !isTopicAdded(topicId)) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.setData("topicId", topicId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const topicId = event.dataTransfer.getData("topicId");

    addTopicToPizza(topicId);
  };

  return (
    <div className="pizza-topics-wrapper">

      <div className="topics-container">
        {topics.map((topic, index) => {
          const added = isTopicAdded(topic.id);
          const next = isTopicNext(topic.id);
          const locked = !added && !next;

          return (
            <button
              key={topic.id}
              type="button"
              className={`pizza-topic-button ${
                selectedTopic === topic.id ? "active" : ""
              } ${added ? "added" : ""} ${next ? "next-topic" : ""} ${
                locked ? "locked-topic" : ""
              }`}
              draggable={!locked}
              onDragStart={(event) => handleDragStart(event, topic.id)}
              onClick={() => addTopicToPizza(topic.id)}
            >



              <span className="pizza-topic-label">{topic.label}</span>

              <img src={topic.icon} alt={topic.label} className="pizza-topic" />
            </button>
          );
        })}
      </div>

      {type === "keva" && (
        <p className="pizza-keva-note">שימו לב: בקבע אין עיתוי הגשת בקשה</p>
      )}

      <div
        className="pizza-drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img src={pizzaTray} alt="מגש פיצה" className="pizza-tray" />

        <div className="pizza-main">
          {topics
            .filter((topic) => safeAddedTopics.includes(topic.id))
            .map((topic, index) => (
              <img
                key={topic.id}
                src={topic.layer}
                alt=""
                className={`pizza-layer ${
                  topic.id !== "base" ? "pizza-topping-layer" : ""
                }`}
                style={{ zIndex: index + 2 }}
              />
            ))}

          {activeTopic && (
            <div className="pizza-topic-text">{activeTopic.text}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PizzaTopics;
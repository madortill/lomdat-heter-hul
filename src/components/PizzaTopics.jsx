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
      text: "כאן יופיע הטקסט של סמכות אישור יציאה לחו״ל",
    },
    {
      id: "sauce",
      label: "אופן דיווח חתימת מפקד",
      icon: pizzaSause,
      layer: pizzaSause,
      text: "כאן יופיע הטקסט של אופן דיווח חתימת מפקד",
    },
    {
      id: "cheese",
      label: "אישור ביטחון מידע",
      icon: pizzaCheese,
      layer: pizzaCheese,
      text: "כאן יופיע הטקסט של אישור ביטחון מידע",
    },
    {
      id: "mushrooms",
      label: "פעולות של משרד המשא״ן",
      icon: pizzaMushrooms,
      layer: pizzaMushrooms,
      text: "כאן יופיע הטקסט של פעולות משרד המשא״ן",
    },
    {
      id: "leaves",
      label: "עיתוי הגשת הבקשה",
      icon: pizzaLeaves,
      layer: pizzaLeaves,
      text: "כאן יופיע הטקסט של עיתוי הגשת הבקשה",
    },
  ];

  const kevaTopics = [
    {
      id: "base",
      label: "סמכות אישור יציאה לחו״ל",
      icon: pizzaBase,
      layer: pizzaBase,
      text: "כאן יופיע הטקסט של סמכות אישור יציאה לחו״ל",
    },
    {
      id: "sauce",
      label: "אופן דיווח חתימת מפקד",
      icon: pizzaSause,
      layer: pizzaSause,
      text: "כאן יופיע הטקסט של אופן דיווח חתימת מפקד",
    },
    {
      id: "cheese",
      label: "אישור ביטחון מידע",
      icon: pizzaCheese,
      layer: pizzaCheese,
      text: "כאן יופיע הטקסט של אישור ביטחון מידע",
    },
    {
      id: "olives",
      label: "פעולות של משרד המשא״ן",
      icon: pizzaOlives,
      layer: pizzaOlives,
      text: "כאן יופיע הטקסט של פעולות משרד המשא״ן",
    },
  ];

  const topics = type === "keva" ? kevaTopics : hovaTopics;

  const activeTopic = topics.find((topic) => topic.id === selectedTopic);

  const addTopicToPizza = (topicId) => {
    const topicExists = topics.some((topic) => topic.id === topicId);

    if (!topicExists) return;

    setSelectedTopic(topicId);

    setAddedTopics((prev) => {
      const safePrev = prev || [];

      if (safePrev.includes(topicId)) {
        return safePrev;
      }

      const updatedTopics = [...safePrev, topicId];

      if (updatedTopics.length === topics.length) {
        onComplete?.();
      }

      return updatedTopics;
    });
  };

  const handleDragStart = (event, topicId) => {
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
        {topics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            className={`pizza-topic-button ${
              selectedTopic === topic.id ? "active" : ""
            } ${addedTopics.includes(topic.id) ? "added" : ""}`}
            draggable
            onDragStart={(event) => handleDragStart(event, topic.id)}
            onClick={() => addTopicToPizza(topic.id)}
          >
            <span className="pizza-topic-label">{topic.label}</span>

            <img src={topic.icon} alt={topic.label} className="pizza-topic" />
          </button>
        ))}
      </div>

      {type === "keva" && (
        <p className="pizza-keva-note">
          שימו לב: בקבע אין עיתוי הגשת בקשה
        </p>
      )}

      <div
        className="pizza-drop-area"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img src={pizzaTray} alt="מגש פיצה" className="pizza-tray" />

        <div className="pizza-main">
          {topics
            .filter((topic) => addedTopics.includes(topic.id))
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
import React, { useEffect, useState } from "react";
import clock from "../assets/images/digitalProcedure/clock.png";
import cardBigBen from "../assets/images/digitalProcedure/cardBigBen.png";

const hovaTopics = [
  {
    id: "timing",
    title: "עיתוי הגשת הבקשה",
    text: "כאן יופיע הטקסט של עיתוי הגשת הבקשה.",
    positionClass: "clock-note-center",
  },
  {
    id: "exitApproval",
    title: "אישור יציאה לחו״ל",
    text: "כאן יופיע הטקסט של אישור יציאה לחו״ל.",
    positionClass: "clock-note-top",
  },
  {
    id: "security",
    title: "אישור ביטחון מידע",
    text: "כאן יופיע הטקסט של אישור ביטחון מידע.",
    positionClass: "clock-note-bottom",
  },
  {
    id: "commander",
    title: "אופן תיעוד וחתימת מפקד",
    text: "כאן יופיע הטקסט של אופן תיעוד וחתימת מפקד.",
    positionClass: "clock-note-right",
  },
  {
    id: "mashan",
    title: "פעולות של משרד המשא״ן",
    text: `לאחר סיום מילוי הבקשה באזור האישי התהליך מתעדכן למערכת "אנשים", המערכת מבצעת בדיקה אוטומטית של מספר קריטריונים לבחינת הבקשה.

לאחר מכן התהליך עובר אוטומטית לאישור המפקדים במערכת "אנשים" ועדכון לפרט לבקשה באזור האישי.

קצין המשא״ן יקבל הודעת עדכון על אישור / שלילת בקשת החייל. בנוסף, הוא יוכל לעקוב אחר סטטוס המשימה בכל שלבי התהליך.`,
    positionClass: "clock-note-left",
  },
];

const kevaTopics = [
  {
    id: "exitApproval",
    title: "אישור יציאה לחו״ל",
    text: "כאן יופיע הטקסט של אישור יציאה לחו״ל עבור אנשי קבע.",
    positionClass: "clock-note-top",
  },
  {
    id: "security",
    title: "אישור ביטחון מידע",
    text: "כאן יופיע הטקסט של אישור ביטחון מידע עבור אנשי קבע.",
    positionClass: "clock-note-bottom",
  },
  {
    id: "commander",
    title: "אופן תיעוד וחתימת מפקד",
    text: "כאן יופיע הטקסט של אופן תיעוד וחתימת מפקד עבור אנשי קבע.",
    positionClass: "clock-note-right",
  },
  {
    id: "mashan",
    title: "פעולות של משרד המשא״ן",
    text: "כאן יופיע הטקסט של פעולות משרד המשא״ן עבור אנשי קבע.",
    positionClass: "clock-note-left",
  },
];

function ClockBigBen({ type = "hova", onComplete, isCompleted = false }) {
  const topics = type === "keva" ? kevaTopics : hovaTopics;

  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [clickedTopics, setClickedTopics] = useState([]);
  const [hasReportedComplete, setHasReportedComplete] = useState(isCompleted);

  useEffect(() => {
    if (isCompleted) {
      setClickedTopics(topics.map((topic) => topic.id));
      setHasReportedComplete(true);
      return;
    }

    setClickedTopics([]);
    setSelectedTopicId(null);
    setHasReportedComplete(false);
  }, [type, isCompleted, topics]);

  useEffect(() => {
    const allTopicsClicked =
      topics.length > 0 && clickedTopics.length === topics.length;

    if (allTopicsClicked && !hasReportedComplete && !isCompleted) {
      setHasReportedComplete(true);
      onComplete?.();
    }
  }, [
    clickedTopics.length,
    topics.length,
    hasReportedComplete,
    isCompleted,
    onComplete,
  ]);

  const selectedTopic = selectedTopicId
    ? topics.find((topic) => topic.id === selectedTopicId)
    : null;

  const handleTopicClick = (topicId) => {
    setSelectedTopicId(topicId);

    setClickedTopics((prev) => {
      if (prev.includes(topicId)) return prev;

      return [...prev, topicId];
    });
  };

  return (
    <div className="clock-big-ben-wrapper">
      <div className="clock-info-card">
        <img src={cardBigBen} alt="" className="clock-info-card-img" />

        <div className="clock-info-card-text">
          {selectedTopic ? (
            <>
              <h3>{selectedTopic.title}</h3>
              <p>{selectedTopic.text}</p>
            </>
          ) : (
""
          )}
        </div>
      </div>

      <div className="clock-container">
        <img src={clock} alt="שעון ביג בן" className="clock-img" />

        <div className="clock-notes-layer">
          {topics.map((topic) => {
            const wasClicked = clickedTopics.includes(topic.id);

            return (
              <button
                key={topic.id}
                type="button"
                className={`clock-note ${topic.positionClass} ${
                  selectedTopicId === topic.id ? "active" : ""
                }`}
                onClick={() => handleTopicClick(topic.id)}
              >
                {wasClicked && <span className="clock-check">✓</span>}
                <span>{topic.title}</span>
              </button>
            );
          })}
        </div>

        {type === "keva" && (
          <p className="clock-keva-note">
            שימו לב: בקבע אין עיתוי הגשת בקשה
          </p>
        )}
      </div>
    </div>
  );
}

export default ClockBigBen;
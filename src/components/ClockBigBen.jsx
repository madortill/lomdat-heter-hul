import React, { useEffect, useState } from "react";
import clock from "../assets/images/digitalProcedure/clock.png";
import cardBigBen from "../assets/images/digitalProcedure/cardBigBen.png";

const hovaTopics = [
  {
    id: "timing",
    title: "עיתוי הגשת הבקשה",
    text: 'חייל נדרש להגיש בקשת היתר יצאה לחו"ל 14 ימים לפחות ממועד היציאה',
    positionClass: "clock-note-center",
  },
  {
    id: "exitApproval",
    title: "אישור יציאה לחו״ל",
    text: 'מפקד מאשר - דרגת רס"ן לפחות',
    positionClass: "clock-note-top",
  },
  {
    id: "security",
    title: "אישור ביטחון מידע",
    text: 'אין צורך בהחתמת משרד בטחון מידע. יתבצע כחלק מהתהליך הדיגיטלי על-ידי צפייה בסרטון ומעבר מבחן בהצלחה (עבור יעדים מורשים בלבד)',
    positionClass: "clock-note-bottom",
  },
  {
    id: "commander",
    title: "אופן תיעוד וחתימת מפקד",
    text: 'אין צורך במילוי טופס ובחתימה ידנית של מפקדים כלל. במסגרת התהליך הדיגיטלי הפרט ממלא את פרטי הבקשה פרטי הבקשה מופיעים כמשימה לביצוע לאישור מפקדו של החייל בדרגת רס"ן.',
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
    text: 'לנגדים וקצינים עד לדרגת רס"ן - סמכות סא"ל לאישור.',
    positionClass: "clock-note-top",
  },
  {
    id: "security",
    title: "אישור ביטחון מידע",
    text: 'אין צורך בהחתמת משרד בטחון מידע. יתבצע כחלק מהתהליך הדיגיטלי ע"י צפייה בסרטון ומעבר מבחן בהצלחה (עבור יעדים מורשים בלבד).',
    positionClass: "clock-note-bottom",
  },
  {
    id: "commander",
    title: "אופן תיעוד וחתימת מפקד",
    text: 'אין צורך במילוי טופס ובחתימה ידנית של מפקד כלל. במסגרת התהליך הדיגיטלי הפרט ממלא את פרטי הבקשה, ומצהיר שקיבל אישור ממפקדו בדרגת סא"ל לפחות, לצאת לחופשה.',
    positionClass: "clock-note-right",
  },
  {
    id: "mashan",
    title: "פעולות של משרד המשא״ן",
    text: 'לאחר סיום מילוי הבקשה בדיגיטל התהליך מתעדכן למערכת "אנשים". המערכת מבצעת בדיקה אוטומטית ומבצעת אישור / שלילה של הבקשה והזנה ישירה של היתר חו"ל ל "אנשים". הבקרה של משרד המשא"ן תתאפשר',
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
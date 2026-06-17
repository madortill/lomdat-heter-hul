import React, { useEffect, useState } from "react";
import cloudQue from "../assets/images/cloudQue.png";
import plane from "../assets/images/openingPage/plane.svg";

import nextBtnText from "../assets/images/introPage/nextBtnText.svg";
import backBtnText from "../assets/images/introPage/backBtnText.svg";

import "../css/Questions.css";

const questions = [
  {
    id: "enteringRequestQuestion",
    title: "איך תוזן בקשת יציאה לחו״ל שהיא לא למטרת חופשה שנתית?",
    correctAnswer: 2,
    answers: [
      "דרך האזור האישי בלבד",
      "באופן ידני על ידי משרד המשא״ן",
      "דרך מוקד התמיכה",
      "אין צורך להזין בקשה",
    ],
  },
  {
    id: "manualProcedureQuestion",
    title: "מהו השלב הראשון בתהליך יציאה לחו״ל בנוהל הידני?",
    correctAnswer: 1,
    answers: [
      "הגשת בקשה ליציאה לחו״ל",
      "קבלת אישור ביטחון מידע",
      "עדכון סטטוס הבקשה",
      "קבלת אישור סופי לטיסה",
    ],
  },
  {
    id: "digitalProcedureQuestion",
    title: "מה חשוב לעשות לפני שממשיכים בתהליך הדיגיטלי?",
    correctAnswer: 3,
    answers: [
      "לסגור את הבקשה",
      "לפתוח בקשה חדשה",
      "לוודא שכל הפרטים הוזנו נכון",
      "למחוק את ההיתר הקיים",
    ],
  },
  {
    id: "generalProceduresQuestion",
    title: "מה עושים אם העדכון מתבצע לאחר תחילת ההיתר?",
    correctAnswer: 4,
    answers: [
      "לא עושים כלום",
      "מעדכנים רק את החייל",
      "ממתינים לסיום החופשה",
      "מבטלים את התהליך ופותחים תהליך חדש ידנית",
    ],
  },
];

function Questions({
  questionIndex = 0,
  isCompleted = false,
  onComplete,
  onNext,
  onBack,
}) {
  const question = questions[questionIndex] || questions[0];

  const [selectedAnswer, setSelectedAnswer] = useState(
    isCompleted ? question.correctAnswer : null
  );
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(isCompleted);
  const [isLocked, setIsLocked] = useState(isCompleted);

  useEffect(() => {
    if (isCompleted) {
      setSelectedAnswer(question.correctAnswer);
      setWrongAnswer(null);
      setIsAnswerCorrect(true);
      setIsLocked(true);
      return;
    }
  
    setSelectedAnswer(null);
    setWrongAnswer(null);
    setIsAnswerCorrect(false);
    setIsLocked(false);
  }, [isCompleted, question.correctAnswer, questionIndex]);

  const handleAnswerClick = (answerNumber) => {
    if (isLocked || isAnswerCorrect) return;
  
    const correct = answerNumber === question.correctAnswer;
  
    if (correct) {
      setSelectedAnswer(answerNumber);
      setWrongAnswer(null);
      setIsAnswerCorrect(true);
      setIsLocked(true);
      onComplete?.();
      return;
    }
  
    setWrongAnswer(answerNumber);
    setIsLocked(true);
  
    setTimeout(() => {
      setWrongAnswer(null);
      setIsLocked(false);
    }, 1100);
  };

  const getAnswerClassName = (answerNumber) => {
    if (selectedAnswer === answerNumber && answerNumber === question.correctAnswer) {
      return "question-cloud-correct";
    }
  
    if (wrongAnswer === answerNumber) {
      return "question-cloud-wrong";
    }
  
    return "";
  };

  return (
    <div className="questions-page">
      <img src={plane} alt="מטוס" className="questions-plane" />

      <h1 className="questions-title">{question.title}</h1>

      <div className="questions-clouds">
        {question.answers.map((answer, index) => {
          const answerNumber = index + 1;

          return (
            <button
              key={answerNumber}
              type="button"
              disabled={isLocked && selectedAnswer !== answerNumber}
              onClick={() => handleAnswerClick(answerNumber)}
              className={`question-cloud question-cloud-${answerNumber} ${getAnswerClassName(
                answerNumber
              )}`}
            >
              <img src={cloudQue} alt="" className="question-cloud-img" />

              <span className="question-cloud-number">{answerNumber}</span>

              <span className="question-cloud-answer">{answer}</span>
            </button>
          );
        })}
      </div>

      <div className="intro-general-nav">
        <img
          src={backBtnText}
          alt="חזור"
          className="intro-general-btn intro-general-back"
          onClick={onBack}
        />

        <img
          src={nextBtnText}
          alt="הבא"
          className={`intro-general-btn intro-general-next ${
            isAnswerCorrect ? "" : "intro-general-btn-disabled"
          }`}
          onClick={isAnswerCorrect ? onNext : undefined}
        />
      </div>
    </div>
  );
}

export default Questions;
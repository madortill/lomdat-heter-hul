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
      "כרגיל דרך צ 360 באופן דיגיטלי",
      'ע"ג טופס ידני ותוזן באופן ידני במערכת אנשים כאשר תוזן סיבה שונה מחופשה שנתית (למשל: מיוחדת חול, חול בתפקיד)',
      "צריך להחתים את כולם דיגיטלי ומפקד יחידה ידני",
      "⁠אי אפשר לצאת לחול שלא באופן ידני",
    ],
  },
  {
    id: "manualProcedureQuestion",
    title: 'האם ניתן להאריך היתר חו"ל קיים?',
    correctAnswer: 1,
    answers: [
      "כן, יש לשים לב לצלם מסך את ההזנה המקורית ולשמור באסמכתאות",
      "לא, צריך לקבל אישור מקמש״ח ורק אז אפשר לשנות",
      "לא, צריך להזין היתר חו״ל חדש",
      "כן, אין צורך לשמור אסמכתא, אין בעיה לתקן.",
    ],
  },
  {
    id: "digitalProcedureQuestion",
    title: 'מנה את הסיבות האפשריות לשלילת בקשה להיתר חו"ל.',
    correctAnswer: 3,
    answers: [
      "תמיד נאשר לחייל לצאת לחופשה, אין מניעה.",
      "לא נאשר אם החייל מבקש דרך מיוחדת ולא דרך חופשה שנתית.",
      'חוסר בימי חופשה, מדינה לא מאושרת, אינדיקציית מצ"ח או חריגה מתת"ש.',
      "לא נאשר אם זה איש קבע.",
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
            isAnswerCorrect ? "" : "disabled-general-btn no-mouse-events"
          }`}
          onClick={isAnswerCorrect ? onNext : undefined}
        />
      </div>
    </div>
  );
}

export default Questions;
import React from "react";
import "../css/EndingPage.css";

import cloud from "../assets/images/openingPage/cloud.png";
import plane from "../assets/images/endingPage/planeLanding.svg";
import cloudBtn from "../assets/images/endingPage/cloudBtn.png";

function EndingPage({ onRestart, onBackToLearn }) {
  return (
    <div className="ending-page">
      <div className="ending-clouds">
        <img src={cloud} alt="" className="ending-cloud ending-cloud1" />
        <img src={cloud} alt="" className="ending-cloud ending-cloud2" />
        <img src={cloud} alt="" className="ending-cloud ending-cloud3" />
        <img src={cloud} alt="" className="ending-cloud ending-cloud4" />
      </div>

      <img src={plane} alt="מטוס" className="ending-plane" />

      <div className="ending-content">
        <h1 className="ending-title">לומדת היתר חו״ל</h1>

        <p className="ending-text">
          כל הכבוד!
          <br />
          סיימתם את הלומדה בהצלחה!
        </p>

        <div className="ending-buttons">
          <button className="ending-cloud-button" onClick={onRestart}>
            <img src={cloudBtn} alt="" className="ending-cloud-btn" />

            <span className="ending-cloud-btn-text">
              להתחיל
              <br />
              מחדש
            </span>
          </button>

          <button className="ending-back-learn-btn" onClick={onBackToLearn}>
            לחזור ללמוד
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndingPage;
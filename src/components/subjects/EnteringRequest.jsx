import React, { useState } from "react";
import ParisBackground from "../../components/backgroundsSvg/ParisBackground";
import "../../css/EnteringRequest.css";

function EnteringRequest({ onNext }) {
  const [activeItem, setActiveItem] = useState(null);

  const content = {
    cafe: {
      title: "בית קפה",
      text: "כאן יופיע ההסבר הראשון על הזנת בקשה.",
    },
    eiffel: {
      title: "מגדל אייפל",
      text: "כאן יופיע ההסבר השני על מילוי פרטי הבקשה.",
    },
    lamp: {
      title: "עמוד תאורה",
      text: "כאן יופיע ההסבר השלישי על שליחת הבקשה.",
    },
  };

  return (
    <div className="subject-page">
      <ParisBackground onItemClick={setActiveItem} />

      <h1 className="request-title">הזנת בקשה</h1>

      {activeItem && (
        <div className="info-overlay" onClick={() => setActiveItem(null)}>
          <div className="info-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setActiveItem(null)}
            >
              ×
            </button>

            <h2>{content[activeItem].title}</h2>
            <p>{content[activeItem].text}</p>
          </div>
        </div>
      )}

      <button className="plane-button" onClick={onNext}>
        ✈
      </button>
    </div>
  );
}

export default EnteringRequest;
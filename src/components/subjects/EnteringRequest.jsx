import React from 'react'
function EnteringRequest({ onNext }) {
    return (
      <div className="subject-page">
        <h1>הזנת בקשה</h1>
  
        <button className="plane-button" onClick={onNext}>
          ✈
        </button>
      </div>
    );
  }
  
  export default EnteringRequest;

import React from 'react';
import { useState } from "react";

function About() {
    const [showAbout, setShowAbout] = useState(false);

    const toggleAbout = () => setShowAbout((prev) => !prev);
  return (
    <div>
         {/* כפתור אודות */}
         <div>
            <button
              className="about-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleAbout();
              }}
            >
              i
            </button>
          </div>
     {/* אודות */}
     <div
            className={`div-about ${showAbout ? "fade-in show" : "fade-out"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="list-text-about">מפתחת ראשית:</h3>
            <p className="list-text-about">סמל מאיה מרום</p>
            <h3 className="list-text-about">גרפיקה:</h3>
            <p className="list-text-about">סמל מאיה מרום</p>
            <h3 className="list-text-about">מומחי תוכן:</h3>
            <p className="list-text-about">מתן</p>
            <p className="list-text-about">רחל</p>
            <h3 className="list-text-about">רמ"ד טי"ל:</h3>
            <p className="list-text-about">סמ"ר קטיה מדבדב </p>
            <h3 className="list-text-about">גרסה:</h3>
            <p className="list-text-about">יוני 2026</p>
          </div> 
    </div>
  )
}

export default About

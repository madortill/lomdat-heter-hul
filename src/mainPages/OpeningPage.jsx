import React, { useState } from 'react';
import "../css/openingPage.css";
import About from "../components/About";
import plane from "../assets/images/openingPage/plane.svg";
import cloud from "../assets/images/openingPage/cloud.png";
import planeSmoke from "../assets/images/openingPage/planeSmoke.svg";

function OpeningPage({ onStart }) {
  const [isFlying, setIsFlying] = useState(false);

  const handleStart = () => {
    setIsFlying(true);

    setTimeout(() => {
      onStart();
    }, 4500);
  };

  return (
    <div className='openingPage'>
      <About />

      <div className="clouds">
        <img src={cloud} alt="cloud" className="cloud cloud1" />
        <img src={cloud} alt="cloud" className="cloud cloud2" />
        <img src={cloud} alt="cloud" className="cloud cloud3" />
        <img src={cloud} alt="cloud" className="cloud cloud4" />
      </div>

      <div className='open-container'>
        <p className={`open-title ${isFlying ? 'fadeText' : ''}`}>
          לומדת היתר חו"ל
        </p>

        <p 
          className={`btn-toStart ${isFlying ? 'fadeText' : ''}`}
          onClick={handleStart}
        >
          בואו נמריא!
        </p>

        {!isFlying ? (
          <img src={plane} alt="plane" className='plane' />
        ) : (
          <img src={planeSmoke} alt="planeSmoke" className='planeSmoke' />
        )}
      </div>
    </div>
  );
}

export default OpeningPage;
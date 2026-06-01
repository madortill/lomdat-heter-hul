import React from 'react'
import "../css/openingPage.css";
import About from "../components/About";
import plane from "../assets/images/openingPage/plane.svg"

function openingPage() {
  return (
    <div className='openingPage'>
        <About />
      <div className='open-container'>
        <p className='open-title'>לומדת היתר חו"ל</p>
        <p className='btn-toStart'>בואו נמריא!</p>
        <img src={plane} alt="plane" className='plane' />
      </div>
    </div>
  )
}

export default openingPage

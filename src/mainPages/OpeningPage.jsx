import React from 'react'
import "../css/openingPage.css";
import About from "../components/About";

function openingPage() {
  return (
    <div className='openingPage'>
        <About />
      <div className='open-container'>
        <p className='open-title'>לומדת היתר חו"ל</p>
        <p className='btn-toStart'>בואו נמריא!</p>
      </div>
    </div>
  )
}

export default openingPage

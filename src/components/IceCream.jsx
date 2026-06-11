import React from "react";

import IceCreamSvg from "./IceCreamSvg";

import chocolate from "../assets/images/manualProcedure/chocolate.png";
import banana from "../assets/images/manualProcedure/banana.png";
import strawberry from "../assets/images/manualProcedure/strawberry.png";
import vanilla from "../assets/images/manualProcedure/vanilla.png";
import coffee from "../assets/images/manualProcedure/coffee.png";
import berries from "../assets/images/manualProcedure/berries.png";
import pistachio from "../assets/images/manualProcedure/pistachio.png";


function IceCream({
  selectedFlavor,
  setSelectedFlavor,
  clickedFlavors = [],
  setClickedFlavors,
  onComplete,
}) {
  const flavors = {
    chocolate: {
      img: chocolate,
      alt: "שוקולד",
      color: "#8B5A3C",
      textColor: "#ffffff",
      text: "חייל חובה בעל היתר 'עובד משמרות.'",
    },
    banana: {
      img: banana,
      alt: "בננה",
      color: "#FFF7C3",
      text: 'כל סוגי בקשות החו"ל שאינן היתר לחופשה שנתית.',
    },
    strawberry: {
      img: strawberry,
      alt: "תות",
      color: "#FFB1B3",
      text: "חייל בסיפוח",
    },
    vanilla: {
      img: vanilla,
      alt: "וניל",
      color: "#FFF8E9",
      text: "סימון מדינה/קונקשיין/מסלול אווירי אסורים",
    },
  };
  const kevaFlavors = {
    first: {
      img: coffee,
      label: "קפה",
      color: "#D6AA7B",
      text: "כאן יופיע מלל ראשון של אנשי קבע.",
    },
    second: {
      img: pistachio,
      label: "פיסטוק",
      color: "#A0D09D",
      text: "כאן יופיע מלל שני של אנשי קבע.",
    },
    third: {
      img: berries,
      label: "פירות יער",
      color: "#D85873",
      textColor: "#ffffff",
      text: "כאן יופיע מלל שלישי של אנשי קבע.",
    },
  };

  const handleFlavorClick = (flavorName) => {
    setSelectedFlavor(flavorName);

    setClickedFlavors((prev) => {
      const updated = prev.includes(flavorName)
        ? prev
        : [...prev, flavorName];

      if (updated.length === Object.keys(flavors).length) {
        onComplete?.();
      }

      return updated;
    });
  };

  const activeFlavor = selectedFlavor ? flavors[selectedFlavor] : null;
  const iceCreamColor = activeFlavor ? activeFlavor.color : "#FFB1B3";

  return (
    <div className="ice-cream-wrapper">
      <div className="ice-creams-container">
        {Object.entries(flavors).map(([flavorName, flavor]) => (
          <button
            key={flavorName}
            className={`ice-cream-btn ${
              selectedFlavor === flavorName ? "active" : ""
            } ${clickedFlavors.includes(flavorName) ? "clicked" : ""}`}
            onClick={() => handleFlavorClick(flavorName)}
          >
            <img src={flavor.img} alt={flavor.alt} />
          </button>
        ))}
      </div>
  
      <IceCreamSvg color={iceCreamColor} />
  
      {activeFlavor && (
  <div
    className="ice-cream-info"
    style={{
      backgroundColor: activeFlavor.color,
      color: activeFlavor.textColor || "#07435d",
    }}
  >
    {activeFlavor.text}
  </div>
)}
    </div>
  );
}

export default IceCream;
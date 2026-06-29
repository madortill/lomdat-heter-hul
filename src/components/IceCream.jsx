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
  type = "hova",
  selectedFlavor,
  setSelectedFlavor,
  clickedFlavors = [],
  setClickedFlavors,
  onComplete,
}) {
  const hovaFlavors = {
    chocolate: {
      img: chocolate,
      alt: "שוקולד",
      color: "#8B5A3C",
      textColor: "#ffffff",
      text: "חייל חובה בעל היתר 'עובד משמרות.'",
    },
    strawberry: {
      img: strawberry,
      alt: "תות",
      color: "#FFB1B3",
      text: "חייל בסיפוח",
    },
    banana: {
      img: banana,
      alt: "בננה",
      color: "#FFF7C3",
      text: 'כל סוגי בקשות החו"ל שאינן היתר לחופשה שנתית.',
    },
    vanilla: {
      img: vanilla,
      alt: "וניל",
      color: "#FFF8E9",
      text: "סימון מדינה/קונקשיין/מסלול אווירי אסורים",
    },
  };

  const kevaFlavors = {
    berries: {
      img: berries,
      alt: "פירות יער",
      color: "#D85873",
      textColor: "#ffffff",
      text: "חייל חובה בעל היתר 'עובד משמרות.'",
    },
    pistachio: {
      img: pistachio,
      alt: "פיסטוק",
      color: "#A0D09D",
      text: 'כל סוגי בקשות החו"ל שאינן היתר לחופשה שנתית.',
    },
    coffee: {
      img: coffee,
      alt: "קפה",
      color: "#D6AA7B",
      text: "סימון מדינה לא מאושרת.",
    },
  };

  const currentFlavors = type === "keva" ? kevaFlavors : hovaFlavors;

  const handleFlavorClick = (flavorName) => {
    setSelectedFlavor(flavorName);

    setClickedFlavors((prev) => {
      const safePrev = prev || [];

      const updated = safePrev.includes(flavorName)
        ? safePrev
        : [...safePrev, flavorName];

      if (updated.length === Object.keys(currentFlavors).length) {
        onComplete?.();
      }

      return updated;
    });
  };

  const activeFlavor = selectedFlavor ? currentFlavors[selectedFlavor] : null;

  const iceCreamColor = activeFlavor ? activeFlavor.color : "#FFB1B3";

  return (
    <div className="ice-cream-wrapper">
      <div className="ice-creams-container">
        {Object.entries(currentFlavors).map(([flavorName, flavor]) => (
          <button
            key={flavorName}
            type="button"
            className={`ice-cream-btn ${
              selectedFlavor === flavorName ? "active" : ""
            } ${clickedFlavors.includes(flavorName) ? "clicked" : ""}`}
            onClick={() => handleFlavorClick(flavorName)}
          >
            <img src={flavor.img} alt={flavor.alt} />
          </button>
        ))}
      </div>

      {activeFlavor && <IceCreamSvg color={iceCreamColor} />}

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
import React, { useEffect, useState } from "react";
import ShelfGiftsSvg from "../components/ShelfGiftsSvg";

const souvenirOrder = [
  {
    id: "keychain",
    number: 1,
    title: "מחזיק מפתחות",
    text: 'במידה והעדכון יהיה לאחר תאריך תחילת החופשה, עדכנו במדינת היעד שיש לבטל את ההיתר שהוזן לכם דרך משרד המשא״ן.',
  },
  {
    id: "building",
    number: 2,
    title: "בניין",
    text: "ודאו שכל פרטי הבקשה מעודכנים ומופיעים בצורה תקינה.",
  },
  {
    id: "taxi",
    number: 3,
    title: "מונית",
    text: "בדקו שהיעד, התאריכים והפרטים האישיים תואמים לבקשה.",
  },
  {
    id: "statue",
    number: 4,
    title: "פסל החירות",
    text: "לאחר השלמת העדכון, ודאו שהבקשה נשמרה והועברה לטיפול.",
  },
];

function ShelfGifts({ isCompleted = false, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [clickedItems, setClickedItems] = useState([]);
  const [visibleText, setVisibleText] = useState("");
  const [completed, setCompleted] = useState(isCompleted);

  const currentStep = souvenirOrder[currentStepIndex];

  useEffect(() => {
    if (isCompleted) {
      setCompleted(true);
      setCurrentStepIndex(souvenirOrder.length);
      setClickedItems(souvenirOrder.map((item) => item.id));
      setVisibleText(souvenirOrder[souvenirOrder.length - 1].text);
      return;
    }

    setCompleted(false);
    setCurrentStepIndex(0);
    setClickedItems([]);
    setVisibleText("");
  }, [isCompleted]);

  const handleSouvenirClick = (itemId) => {
    if (completed) {
      const clickedItem = souvenirOrder.find((item) => item.id === itemId);
  
      if (clickedItem) {
        setVisibleText(clickedItem.text);
      }
  
      return;
    }
  
    const alreadyClickedItem = souvenirOrder.find(
      (item) => item.id === itemId && clickedItems.includes(item.id)
    );
  
    if (alreadyClickedItem) {
      setVisibleText(alreadyClickedItem.text);
      return;
    }
  
    const expectedItem = souvenirOrder[currentStepIndex];
  
    if (!expectedItem) return;
  
    if (itemId !== expectedItem.id) {
      return;
    }
  
    const updatedClickedItems = [...clickedItems, itemId];
    const nextStepIndex = currentStepIndex + 1;
  
    setClickedItems(updatedClickedItems);
    setVisibleText(expectedItem.text);
  
    if (nextStepIndex === souvenirOrder.length) {
      setCompleted(true);
      setCurrentStepIndex(nextStepIndex);
      onComplete?.();
      return;
    }
  
    setCurrentStepIndex(nextStepIndex);
  };

  return (
    <div className="shelf-gifts-wrapper">
      {visibleText && (
        <div className="shelf-gifts-text-box">
          <p>{visibleText}</p>
        </div>
      )}

      <div className="shelf-gifts-svg-area">
      <ShelfGiftsSvg
  clickedItems={clickedItems}
  currentItemId={completed ? null : currentStep?.id}
  onItemClick={handleSouvenirClick}
/>
      </div>
    </div>
  );
}

export default ShelfGifts;
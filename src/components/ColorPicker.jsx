import { useState, useRef, useEffect, useLayoutEffect } from "react";

const ColorPicker = ({ baseColor = "#ffffff", onChange }) => {
  const [color, setColor] = useState(baseColor); // Initial color is white
  const colorInputRef = useRef(null); // Ref for the hidden color input

  useEffect(() => {
    setColor(baseColor); // Update the color when the baseColor prop changes
  }, [baseColor]);

  // Handle color change
  const handleInputChange = (event) => {
    setColor(event.target.value); // Set the new color as user selects it
  };

  // Open the color input dialog when the div is clicked
  const handleDivClick = () => {
    colorInputRef.current.click(); // Trigger the color input dialog
  };

  useLayoutEffect(() => {
    if (!colorInputRef.current) return;
    const logEvent = (e) => {
      onChange(e.target.value);
    };
    const inputElement = colorInputRef.current;
    inputElement.addEventListener("change", logEvent, false);
    return () => {
      inputElement.removeEventListener("change", logEvent);
    };
  }, [colorInputRef, onChange]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        position: "relative", // Set the container to relative to position the popover
      }}
    >
      {/* Display the selected color as a clickable div */}
      <div
        onClick={handleDivClick} // Handle click on the div to trigger color picker
        style={{
          width: "26px",
          height: "20px",
          border: "1px solid white", // White border
          backgroundColor: color, // Background color set to the selected color
          cursor: "pointer", // Pointer cursor to indicate it's clickable
        }}
      ></div>

      {/* Hidden color input (will trigger the picker when the div is clicked) */}
      <input
        ref={colorInputRef}
        type="color"
        value={color}
        onChange={handleInputChange} // Update color when picked
        style={{
          display: "none", // Hide the input element (the square box)
        }}
      />
    </div>
  );
};

export default ColorPicker;

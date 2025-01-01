import { useState, useRef } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#ffffff"); // Initial color is white
  const colorDivRef = useRef(null); // Ref for the color div
  const colorInputRef = useRef(null); // Ref for the hidden color input

  // Handle color change
  const handleChange = (event) => {
    setColor(event.target.value); // Set the new color when the picker changes
  };

  // Open the color input dialog when the div is clicked
  const handleDivClick = () => {
    colorInputRef.current.click(); // Trigger the color input dialog
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        marginTop: "50px",
        position: "relative", // Set the container to relative to position the popover
      }}
    >
      {/* Display the selected color as a clickable div */}
      <div
        ref={colorDivRef} // Assign ref to the color div
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
        onChange={handleChange} // Update color when picked
        style={{
          display: "none", // Hide the input element (the square box)
        }}
      />
    </div>
  );
};

export default ColorPicker;

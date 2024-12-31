import { useState } from "react";
import styled from "styled-components";

const EditableInput = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setEditing(false);
    onSave(inputValue); // Save the value on blur
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      onSave(inputValue); // Save the value on pressing Enter
    } else if (event.key === "Escape") {
      setEditing(false);
      setInputValue(value); // Revert to original value on pressing Escape
    }
  };

  return editing ? (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <Text onClick={() => setEditing(true)}>{value || "Click to edit"}</Text>
  );
};

export default EditableInput;

const Text = styled.h1`
  line-height: 16px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 0;
`;

import styled from "styled-components";

const Text = ({
  element = "p",
  canEdit = true,
  children,
  style = {},
  onChange,
  ...props
}) => {
  const handleBlur = (e) => {
    onChange(e.target.innerText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the default Enter behavior (like adding a new line in contentEditable)
      e.target.blur(); // Triggers the blur
    }
  };

  const Tag = element; // Dynamically use the tag name (p, h1, h3, etc.)

  return (
    <Root>
      <Tag
        style={{
          ...style,
        }}
        contentEditable={canEdit && Boolean(onChange)}
        suppressContentEditableWarning
        spellCheck="false" // Disable spell checking
        onBlur={handleBlur}
        onKeyDown={handleKeyDown} // Handle keydown event to check for Enter key
        {...props}
      >
        {children}
      </Tag>
    </Root>
  );
};

export default Text;

const Root = styled.span`
  display: inline-block;
`;

import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// Styled component with the provided styles
const StyledTextarea = styled.textarea`
  width: 100%; /* Ensure it spans the full width of the container */
  height: 2em; /* Set a fixed height for a single line appearance */
  padding: 3px 15px; /* Adjust padding to ensure text is vertically centered */
  border: 1px solid #bdebff;
  border-radius: 15px;
  resize: none; /* Prevent resizing of the textarea */
  box-sizing: border-box; /* Include padding and border in element's total width and height */
  margin-top: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
  font-size: 1em; /* Adjust the font size to match the line height */
  line-height: 1.5; /* Ensure the line height fits within the height */
  overflow: hidden; /* Hide overflow if any */
  text-align: left; /* Optional: Adjust text alignment */
`;

const CommentTextarea = ({ value, onChange, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <StyledTextarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CommentTextarea;

import React, { useRef, useEffect } from "react";
import styled from "styled-components";

// Styled component for the textarea
const StyledTextarea = styled.textarea`
  width: 100%;
  height: 1em;

  padding-top: 10px;
  padding-left: 10px;
  border: 1px solid #bdebff;
  border-radius: 15px;
  resize: none; /* Prevent resizing of the textarea */
  box-sizing: border-box; /* Include padding and border in element's total width and height */
  margin-top: 10px;
  margin-left: -12px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
  font-size: 1em; /* Adjust font size to match line height */
  line-height: 1em; /* Line height should be the same as height for consistency */
  overflow: hidden; /* Hide overflow if any */
  text-align: left; /* Optional: Adjust text alignment */

  &:focus {
    border-color: #007bff; /* Change to your desired color */
    outline: none; /* Remove default outline to use custom border color */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Optional: Add a shadow to highlight focus */
  }
`;

const CommentTextarea = ({ value, onChange, ...props }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto before adjusting
      // Set height based on content but limit it to one line
      textarea.style.height = `${Math.max(
        textarea.scrollHeight,
        1.5 * parseFloat(getComputedStyle(textarea).lineHeight)
      )}px`;
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

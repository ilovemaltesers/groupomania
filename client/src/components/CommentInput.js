import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 1em;

  padding-top: 10px;
  padding-left: 10px;
  border: 1px solid #bdebff;
  border-radius: 15px;
  resize: none;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: -12px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  line-height: 1em;
  overflow: hidden;
  text-align: left;

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
      textarea.style.height = "auto";

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

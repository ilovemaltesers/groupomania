// ModalStyles.js
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";

// Styled Modal with custom background and text colors
export const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${(props) =>
      props.theme.modalBackground}; /* Custom background */
    color: ${(props) => props.theme.modalText}; /* Custom text color */
  }

  .modal-header {
    border-bottom: none;
    background-color: ${(props) => props.theme.modalBackground};
  }

  .modal-title {
    color: ${(props) => props.theme.modalTitleColor};
  }
`;

// Styled version of Form.Label
export const StyledFormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.modalText};
`;

// Styled Button within the modal
export const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.modalButtonColor};
  color: ${(props) => props.theme.modalButtonText}; // Fixed casing here
  border: none;

  &:hover {
    background-color: ${(props) => props.theme.modalButtonSelected};
  }

  &:active {
    background-color: ${(props) => props.theme.modalButtonSelected};
  }
`;

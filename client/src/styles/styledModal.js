// ModalStyles.js
import styled from "styled-components";
import { Modal, Button, Form } from "react-bootstrap";

export const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${(props) => props.theme.modalBackground};
    color: ${(props) => props.theme.modalText};
  }

  .modal-header {
    border-bottom: none;
    background-color: ${(props) => props.theme.modalBackground};
  }

  .modal-title {
    color: ${(props) => props.theme.modalTitleColor};
  }
`;

export const StyledFormLabel = styled(Form.Label)`
  color: ${(props) => props.theme.modalText};
`;

export const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.modalButtonColor};
  color: ${(props) => props.theme.modalButtonText};
  border: none;

  &:hover {
    background-color: ${(props) => props.theme.modalButtonSelected};
  }

  &:active {
    background-color: ${(props) => props.theme.modalButtonSelected};
  }
`;

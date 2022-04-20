import React from "react";
import { ModalBody, ModalHeader, ModalTitle, Modal } from "react-bootstrap";
import ModalForm from "./ModalForm";

function CustomModal({
  onSubmit,
  originRef,
  destinationRef,
  isVisible,
  closeModal,
}) {
  return (
    <Modal show={isVisible} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>Enter Route Information</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ModalForm
          onSubmit={onSubmit}
          originRef={originRef}
          destinationRef={destinationRef}
        />
      </ModalBody>
    </Modal>
  );
}

export default CustomModal;

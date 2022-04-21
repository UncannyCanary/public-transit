import React from "react";
import { ModalBody, ModalHeader, ModalTitle, Modal } from "react-bootstrap";
import ModalForm from "./ModalForm";

function CustomModal({
  onSubmit,
  isVisible,
  closeModal,
  inputFieldStops,
  setInputFieldStops,
  routeInfo,
  setRouteInfo,
}) {
  return (
    <Modal show={isVisible} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>Enter Route Information</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <ModalForm
          onSubmit={onSubmit}
          inputFieldStops={inputFieldStops}
          setInputFieldStops={setInputFieldStops}
          routeInfo={routeInfo}
          setRouteInfo={setRouteInfo}
        />
      </ModalBody>
    </Modal>
  );
}

export default CustomModal;

import React from "react";
import { Button,  Modal } from "react-bootstrap";
import LevelForm from "./level-form";

export const LevelModals = ({ showModal, onClose,editData }) => {
  function MyVerticallyCenteredModal(props) {
    const title=editData ? "Update Level" : "Create Level"
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LevelForm  editData={editData}/>
          
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <MyVerticallyCenteredModal show={showModal} onHide={onClose} />
  );
};

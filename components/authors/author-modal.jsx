import React from "react";
import { Button, Modal } from "react-bootstrap";
import AuthorsForm from "./authors-form";

export const AuthorsModal = ({ showModal, onClose,editData }) => {
  function MyVerticallyCenteredModal(props) {
    const title=editData ? "Update Author" : "Create Author"
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
          <AuthorsForm  editData={editData}/>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <MyVerticallyCenteredModal show={showModal} onHide={onClose} />
  );
};

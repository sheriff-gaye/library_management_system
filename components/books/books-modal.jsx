import React from "react";
import { Button,  Modal } from "react-bootstrap";
import BookForm from "./books-form";

export const BooksModals = ({ showModal, onClose,editData }) => {
  function MyVerticallyCenteredModal(props) {
    const title=editData ? "Update Book" : "Create Book"
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookForm  editData={editData}/>
          
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

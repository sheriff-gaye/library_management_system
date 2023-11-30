import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import CategoryForm from "./category-form";

export const CategoryModals = ({ showModal, onClose,editData }) => {
  function MyVerticallyCenteredModal(props) {
    const title=editData ? "Update Category" : "Create Cayegory"
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
          <CategoryForm  editData={editData}/>
          
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

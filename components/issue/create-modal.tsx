import React from "react";
import { Button,  Modal } from "react-bootstrap";
import { IssueForm } from "./issue-form";

export const CreateIssueModal = ({ showModal, onClose,returnData }) => {
  function MyVerticallyCenteredModal(props) {
    const title=returnData ? "ReIssue Book" : "Issue Book"
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
          <IssueForm  editData={returnData}/>
          
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

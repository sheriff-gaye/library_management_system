import { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const ReturnModals = ({ showModal, close,onConfirm }) => {
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Return Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="returnDate">
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              readOnly
              type="date"
              name="returnDate"
              value={new Date().toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="danger" type="submit" onClick={onConfirm}>
            Return Book
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Fragment>
      <MyVerticallyCenteredModal show={showModal} onHide={close} />
    </Fragment>
  );
};

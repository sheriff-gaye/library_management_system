import {  Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

export const DeleteModals = ({showModal,close,onConfirm}) => {

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>This Action Cannot be Undone</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button variant="danger" type="submit"  onClick={onConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }


  return (
    <Fragment>
      <MyVerticallyCenteredModal
        show={showModal}
        onHide={close}
      />
    </Fragment>
  );
};

import React, { useState } from "react";

import FishDate from "./FishDate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FishNumber from "./FishNumber";
import background from "./BackgroundInbox.png";
import "./FishInItem.css";
const FishInItem = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <tr onClick={handleShow}>
        <td width="10%" align="center">
          <FishDate date={props.date} />
        </td>
        <td width="10%" align="center" className="fishSentName">
          {props.name}
        </td>
        <td width="15%" align="center">
          <FishNumber fishcount={props.fishcount} />
        </td>
        <td align="center">{props.message}</td>
      </tr>

      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="pop-up-modal-header">
          <Modal.Title>
            <h5>{props.date.substring(0, 10)}</h5>
            <h5>{props.name}</h5>
            <h5>
              <FishNumber fishcount={props.fishcount} />
            </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pop-up-modal">
          <p>{props.message}</p>
        </Modal.Body>
        <Modal.Footer className="pop-up-modal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FishInItem;

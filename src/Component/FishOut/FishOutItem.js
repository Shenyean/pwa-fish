import { React, useState } from "react";
import FishDate from "../FishIn/FishDate";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FishOutNumber from "./FishOutNumber";
//import background from "./BackgroundInbox.png";
const FishOutItem = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <tr
        onClick={handleShow}
        // background={background}
        // width="100%"
        // height="100%"
      >
        <td width="10%" align="center">
          <FishDate date={props.date} />
        </td>
        <td width="10%" align="center" className="fishSentName">
          {props.name}
        </td>
        <td width="15%" align="center">
          <FishOutNumber fishcount={props.fishcount} />
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
            <h6>FROM</h6>
            <h6>{props.name}</h6>
            <h6>DATE</h6>
            <h6>{props.date.substring(0, 10)}</h6>
            <h6>NO. OF FISHES</h6>
            <h5>
              <FishOutNumber fishcount={props.fishcount} />
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

export default FishOutItem;

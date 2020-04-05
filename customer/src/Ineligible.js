import React from 'react';
import {Modal} from 'react-bootstrap';

function Ineligible(props) {
  return (
    <Modal show={props.show} onHide={props.close} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.bank.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sorry, you are currently ineligible for this food bank
      </Modal.Body>
    </Modal>
  );
}

export default Ineligible;
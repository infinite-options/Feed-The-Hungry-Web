import React from 'react';
import {Modal, ListGroup} from 'react-bootstrap';

function Cart(props) {

  return (
    <Modal show={props.show} onHide={props.hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.cart.length === 0 ? 'Shopping cart empty' : ''}
        <ListGroup variant='flush'>
          {props.cart.map((elem) => 
            <ListGroup.Item>
              {elem.item.name}
              <span className='float-right'>{'x'+elem.count}</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        {props.cart.length > 0 ? 'Checkout' : ''}
      </Modal.Footer>
    </Modal>
  );

}

export default Cart;
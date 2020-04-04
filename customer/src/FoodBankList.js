import React from 'react';
import {Container, Row, Button, ListGroup} from 'react-bootstrap';

function FoodBankList(props) {
   return (
      <Container>
         <Row className='d-flex justify-content-around'>
            <h1>Food Bank List</h1>
            <Button onClick={props.toMap}>Map view</Button>
         </Row>
         <Row className='d-flex'>
            <ListGroup className='flex-fill' variant='flush'>
               {props.foodbanks.map(bank => (
                  <ListGroup.Item onClick={()=>props.select(bank)}>
                     {bank.name}, {bank.food.length} items
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Row>
      </Container>
   );
}

export default FoodBankList;
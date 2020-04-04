import React from 'react';
import {Container, Row, Button, ListGroup} from 'react-bootstrap';
import {Map} from 'react-bootstrap-icons';

function FoodBankList(props) {
   return (
      <Container>
         <Row className='d-flex justify-content-around'>
            <h1>Food Bank List</h1>
            <Map onClick={props.toMap} size={48}/>
         </Row>
         <Row className='d-flex'>
            <ListGroup className='flex-fill' variant='flush'>
               {props.foodbanks.map(bank => (
                  <ListGroup.Item onClick={()=>props.select(bank)}
                   key={bank.id} className='m-0 d-flex flex-row'>
                     <span className='align-self-center p-3'>
                        {bank.name}
                     </span>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Row>
      </Container>
   );
}

export default FoodBankList;
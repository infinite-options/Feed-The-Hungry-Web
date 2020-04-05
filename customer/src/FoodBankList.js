import React from 'react';
import {Container, Row, ListGroup} from 'react-bootstrap';
import {Map, CheckCircle, XCircle} from 'react-bootstrap-icons';

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
                  <ListGroup.Item onClick={()=> {
                     bank.eligible ? props.select(bank) : props.alertIneligible(bank);
                  }}
                   key={bank.id} className='m-0 d-flex flex-row justify-content-between'>
                     <span className='align-self-center p-3'>
                        {bank.name}
                     </span>
                     <span className='align-self-center p-3'>
                        {bank.eligible ? (
                           <CheckCircle size={24} color='green'/>
                        ) : (
                           <XCircle size={24} color='red'/>
                        )}
                     </span>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Row>
      </Container>
   );
}

export default FoodBankList;
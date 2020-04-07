import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, ListGroup} from 'react-bootstrap';
import {Map, CheckCircle, XCircle} from 'react-bootstrap-icons';

function FoodBankList(props) {
   return (
      <Container fluid>
         <Row className='d-flex justify-content-around bg-primary p-3'>
            <h1>Food Bank List</h1>
            <Link to='/map'>
               <Map size={48} color='black'/>
            </Link>
         </Row>
         <Container className='d-flex'>
            <ListGroup className='flex-fill' variant='flush'>
               {props.foodbanks.map(bank => (
                  <ListGroup.Item key={'bank'+bank.id}>
                     <Link to={bank.eligible ? '/browse' : '/list'}
                      className='m-0 d-flex flex-row justify-content-between text-decoration-none'>
                        <span className='align-self-center p-3 text-dark'>
                           {bank.name}
                        </span>
                        <span className='align-self-center p-3'>
                           {bank.eligible ? (
                              <CheckCircle size={24} color='green'/>
                           ) : (
                              <XCircle size={24} color='red'/>
                           )}
                        </span>
                     </Link>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Container>
      </Container>
   );
}

export default FoodBankList;
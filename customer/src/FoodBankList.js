import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, ListGroup, Col, Collapse} from 'react-bootstrap';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi';
import {GoSearch} from 'react-icons/go';
import {IoIosMenu} from 'react-icons/io';

import Map from './Map.js';

function FoodBankList(props) {
   const [expanded, setExpanded] = useState(false);
   return (
      <Container fluid className='p-0 d-flex flex-column'>
         <Row className='bg-primary w-100 p-3 m-0 d-flex justify-content-between'>
            <h1 className='flex-fill text-center'>Food Banks</h1>
            <Col  className='float-right d-flex justify-content-around'>
               <IoIosMenu size={48} color='black' className='d-lg-none mx-3' onClick={()=>setExpanded(!expanded)}/>
               <GoSearch size={48} color='black'/>
            </Col>
         </Row>
         <Row className='w-100 m-0 flex-fill'>
            <Collapse as={Col} lg={4} in={expanded}>
               <ListGroup variant='flush' className='p-0 d-lg-block'>
                  {props.foodbanks.map(bank => (
                     <ListGroup.Item key={'bank'+bank.id} className={bank.eligible ? '' : 'bg-light'}>
                        <Link to={bank.eligible ? '/browse' : '/list'}
                        className='m-0 d-flex flex-row justify-content-between text-decoration-none'>
                           <span className='align-self-center p-3 text-dark'>
                              {bank.name}
                           </span>
                           <span className='align-self-center p-3'>
                              {bank.eligible ? (
                                 <FiCheckCircle size={24} color='green'/>
                              ) : (
                                 <FiXCircle size={24} color='red'/>
                              )}
                           </span>
                        </Link>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            </Collapse>
            <Col lg={8} className='p-0'>
               <Map/>
            </Col>
         </Row>
      </Container>
   );
}

export default FoodBankList;
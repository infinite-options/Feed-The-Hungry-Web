import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, ListGroup, Col, Collapse} from 'react-bootstrap';
import {FiCheckCircle, FiXCircle} from 'react-icons/fi';
import {GoSearch} from 'react-icons/go';
import {IoIosMenu} from 'react-icons/io';

import Map from './Map.js';

class FoodBankList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         expanded: false,
         banks: [],
         loaded: false
      }
   }

   initialize = async() => {
      let response = await fetch('https://feed-the-hungry.netlify.com/api/banks/');
      let banks = await response.json();
      this.setState({banks: banks});
   }

   componentDidMount() {
      this.initialize().then(this.setState({loaded: true}));
   }

   render() {
      if (!this.state.loaded) {
         return <h1>Loading...</h1>
      }
      return (
         <Container fluid className='p-0 d-flex flex-column'>
            <Row className='bg-primary w-100 p-3 m-0 d-flex justify-content-between'>
               <h1 className='flex-fill text-center'>Feed the Hungry</h1>
               <Col  className='float-right d-flex justify-content-around'>
                  <IoIosMenu size={48} color='black' className='d-lg-none mx-3'
                   onClick={()=>this.setState({expanded: !this.state.expanded})}/>
                  <GoSearch size={48} color='black'/>
               </Col>
            </Row>
            <Row className='w-100 m-0 flex-fill'>
               <Collapse as={Col} lg={4} in={this.state.expanded}>
                  <ListGroup variant='flush' className='p-0 d-lg-block'>
                     {this.state.banks.map(bank => (
                        <ListGroup.Item key={'bank'+bank.id}>
                           <Link to='/browse' className='m-0 d-flex flex-row
                            justify-content-between text-decoration-none'
                            onClick={() => this.props.select(bank)}>
                              <span className='align-self-center p-3 text-dark'>
                                 {bank.name}
                              </span>
                              <span className='align-self-center p-3'>
                                 
                              </span>
                           </Link>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Collapse>
               <Col lg={8} className='p-0'>
                  <Map banks={this.state.banks} select={this.props.select}/>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default FoodBankList;
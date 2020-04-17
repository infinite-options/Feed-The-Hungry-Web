import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row, ListGroup, Col, Collapse} from 'react-bootstrap';
import {GoSearch} from 'react-icons/go';
import {IoIosMenu} from 'react-icons/io';

import 'google-maps';
import Map from './Map.js';

class FoodBankList extends Component {
   constructor(props) {
      super(props);
      this.geocoder = new window.google.maps.Geocoder();
      this.location = null;
      this.state = {
         expanded: false,
         banks: [],
         loaded: false,
         location: null
      }
      this.mapRef = React.createRef();
   }

   getGeocode = (bank) => {
      const geocoder = this.geocoder;
     return new Promise(function(resolve, reject) {
       geocoder.geocode({
         address: bank.address+', '+bank.city+', '+bank.state+', '+bank.zip
       }, function(result, status) {
         if (status == 'OK') {
           resolve(result[0].geometry.location);
         } else {
           reject(status);
         }
       });
     });
   }

   initialize = async(resolve) => {
      const setLocation = (pos) => {this.location = pos};
      let response = await fetch('https://feed-the-hungry.netlify.app/api/banks/');
      let banks = await response.json();
      this.setState({banks: banks});
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
               lat: position.coords.latitude,
               lng: position.coords.longitude
            }
            setLocation(pos);
            resolve();
         });
      }
   }

   componentDidMount() {
      this.initialize(()=>this.setState({loaded: true}));
   }

   componentDidUpdate() {
      if (this.mapRef.current == null) {
         setTimeout(this.forceUpdate, 1000);
         return;
      } else {
         this.mapRef.current.forceUpdate();
      }
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
            <Row className='h-100'>
               <Collapse as={Col} lg={4} in={this.state.expanded}>
                  <ListGroup variant='flush' className='p-0 d-lg-inline-block'>
                     {this.state.banks.map(bank => (
                        <ListGroup.Item key={'bank'+bank.id}>
                           <Link to='/browse' className='m-0 d-flex flex-row
                            justify-content-between text-decoration-none'
                            onClick={() => this.props.select(bank)}>
                              <span className='align-self-center p-3 text-dark'>
                                 {bank.name}
                              </span>
                           </Link>
                        </ListGroup.Item>
                     ))}
                  </ListGroup>
               </Collapse>
               <Col lg={8} className='p-0 h-100 d-lg-inline-block'>
                  <Map banks={this.state.banks} select={this.props.select}
                   pos={this.location} getGeocode={this.getGeocode}
                   ref={this.mapRef}/>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default FoodBankList;
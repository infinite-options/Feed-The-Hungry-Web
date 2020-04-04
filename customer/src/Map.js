import React from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
import 'google-maps';

import './Map.css';

class Map extends React.Component {

  componentDidMount() {
    var map = new window.google.maps.Map(document.querySelector('#map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 10
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
      }, function() {
        console.log('error retrieving geolocation');
      });
    } else {
      console.log('geolocation not supported');
    }
  }

  render() {
    return (
      <Container fluid className='d-flex flex-column justify-content-between'>
        <Row className='d-flex justify-content-center'>
          <div id='map'></div>
        </Row>
        <Button className='align-self-center mt-3' onClick={this.props.toList}>List view</Button>
      </Container>
    );
  }
}

export default Map;
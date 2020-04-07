import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Row} from 'react-bootstrap';
import 'google-maps';

import './Map.css';

class Map extends React.Component {

  componentDidMount() {
    var map = new window.google.maps.Map(document.querySelector('#map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        new window.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: pos,
          radius: 100
        });
      }, function() {
        console.log('error retrieving geolocation');
      });
    } else {
      console.log('geolocation not supported');
    }
  }

  render() {
    return (
      <Container fluid className='d-flex flex-column justify-content-between mt-3'>
        <Row className='d-flex justify-content-center'>
          <div id='map'></div>
        </Row>
        <Link to='/list'>
          <Button className='align-self-center mt-3'>List view</Button>
        </Link>
      </Container>
    );
  }
}

export default Map;
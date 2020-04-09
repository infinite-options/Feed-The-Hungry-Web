import React from 'react';
import 'google-maps';

import './Map.css';

class Map extends React.Component {

  constructor(props) {
    super(props);
  }

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
      <div id='map' className='flex-fill'></div>
    );
  }
}

export default Map;
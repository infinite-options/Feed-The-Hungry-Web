import React from 'react';
import 'google-maps';

import './Map.css';
import { Redirect } from 'react-router-dom';

var map;
var geocoder;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toBrowse: false
    }
  }

  getGeocode = (bank) => {
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

  distanceTo = (bank) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var otherPos = this.getGeocode(bank);
      });
    }
  }

  initialize = async() => {
    geocoder = new window.google.maps.Geocoder();
    map = new window.google.maps.Map(document.querySelector('#map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 12
    });
    this.props.banks.forEach(bank => {
      this.getGeocode(bank)
      .then(pos => {
        var marker = new window.google.maps.Marker({
          position: pos,
          map: map,
          title: bank.name
        });
        marker.addListener('click', () => {
          this.props.select(bank);
          this.setState({toBrowse: true});
        });
      })
      .catch(error => console.log('geocode failure: '+console.error()));
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

  componentDidMount() {
    this.initialize();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.banks !== prevProps.banks)
    {
      this.initialize();
    }
  }

  render() {
    if (this.state.toBrowse) {
      console.log('before redirect');
      return <Redirect to='/browse'/>
    }
    return (
      <div id='map' className='flex-fill'></div>
    );
  }
}

export default Map;
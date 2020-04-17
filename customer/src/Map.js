import React from 'react';
import 'google-maps';

import './Map.css';
import { Redirect } from 'react-router-dom';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toBrowse: false
    }
    this.map = null;
    this.markers = [];
  }

  initialize = async() => {
    if (window.location.href != 'https://feed-the-hungry.netlify.app/list') {
      return;
    }
    if (!document.querySelector('#map')) {
      console.log('map not loaded');
      setTimeout(this.forceUpdate, 1000);
      return;
    }
    this.map = new window.google.maps.Map(document.querySelector('#map'), {
      center: this.props.pos,
      zoom: 12
    });
    this.props.banks.forEach(bank => {
      this.props.getGeocode(bank)
      .then(pos => {
        var marker = new window.google.maps.Marker({
          position: pos,
          map: this.map,
          title: bank.name
        });
        marker.addListener('click', () => {
          this.props.select(bank);
          this.setState({toBrowse: true});
        });
        this.markers.push(marker);
      }).catch(error => console.log('geocode failure: '+error));
    });
    new window.google.maps.Circle({
      strokeColor: '#FFFFFF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.35,
      map: this.map,
      center: this.props.pos,
      radius: 100
    });
  }

  componentDidUpdate() {
    this.initialize()
  }

  render() {
    if (this.state.toBrowse) {
      console.log('before redirect');
      return <Redirect to='/browse'/>
    }
    return (
      <div id='map'></div>
    );
  }
}

export default Map;
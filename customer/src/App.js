import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import SplashScreen from './SplashScreen.js';
import FoodBankList from './FoodBankList.js';
import Browse from './Browse.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBank: {id: 0, name: 'Food Not Bombs'}
    }
  }

  componentDidMount() {
    fetch('http://feed-the-hungry.netlify.com/api/banks/0/')
    .then(res => res.json().then(data => {
      this.setState({currentBank: data});
    }));
  }

  render() {
    return (
      <>
        <Route exact path='/'>
          <SplashScreen />
        </Route>
        <Route exact path='/list'>
          <FoodBankList select={bank => this.setState({currentBank: bank})}/>
        </Route>
        <Route exact path='/browse'>
          <Browse bank={this.state.currentBank}/>
        </Route>
      </>
    );
  }
}

export default App;

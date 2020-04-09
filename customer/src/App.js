import React, {useState} from 'react';
import {Route} from 'react-router-dom';

import SplashScreen from './SplashScreen.js';
import FoodBankList from './FoodBankList.js';
import Browse from './Browse.js';
import Map from './Map.js';

let foodbanks = [
  {name: 'Food Not Bombs', id: 0, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: true},
  {name: 'Santa Cruz Food Bank', id: 1, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true},
  {name: 'West Valley Community Center', id: 2, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: false},
  {name: 'Second Harvest Food Bank', id: 3, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true},
  {name: 'Monterey County Food Bank', id: 4, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: false},
  {name: 'H.O.P.E Calling Food Pantry', id: 5, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true}
];

function App() {
  const [currentBank, setCurrentBank] = useState(foodbanks[0]);

  return (
    <>
      <Route exact path='/'>
        <SplashScreen />
      </Route>
      <Route exact path='/list'>
        <FoodBankList foodbanks={foodbanks} select={bank=>setCurrentBank(bank)}/>
      </Route>
      <Route exact path='/browse'>
        <Browse bank={currentBank}/>
      </Route>
    </>
  );
}

export default App;

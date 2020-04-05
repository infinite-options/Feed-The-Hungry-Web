import React, {useState} from 'react';

import SplashScreen from './SplashScreen.js';
import Login from './Login.js';
import Signup from './Signup.js';
import FoodBankList from './FoodBankList.js';
import Browse from './Browse.js';
import Map from './Map.js';
import Ineligible from './Ineligible.js';

let foodbanks = [
  {name: 'Food Not Bombs', id: 0, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: true},
  {name: 'Santa Cruz Food Bank', id: 1, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true},
  {name: 'West Valley Community Center', id: 2, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: false},
  {name: 'Second Harvest Food Bank', id: 3, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true},
  {name: 'Monterey County Food Bank', id: 4, food: [{name: 'Apple', max: 5}, {name: 'Banana', max: 10}, {name: 'Orange', max: 8}], eligible: false},
  {name: 'H.O.P.E Calling Food Pantry', id: 5, food: [{name: 'Chicken', max: 2}, {name: 'Filet Mignon', max: 1}, {name: 'Ribeye', max: 2}], eligible: true}
];

function App() {
  const [modal, setModal] = useState('none');
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState('list');
  const [currentBank, setCurrentBank] = useState(foodbanks[0]);

  const alertIneligible = (bank) => {
    setCurrentBank(bank);
    setModal('ineligible');
  }

  return (
    loggedIn ? 
    <>
      {view === 'map' ? <Map toList={() => setView('list')}/> :
       view === 'list' ? <FoodBankList foodbanks={foodbanks} select={bank=>{setCurrentBank(bank); setView('bank')}}
                          toMap={() => setView('map')} alertIneligible={(bank)=>alertIneligible(bank)}/> :
       view === 'bank' ? <Browse bank={currentBank} back={()=>setView('list')}/> :
       view === 'checkout' ? '' : ''}
      <Ineligible show={modal==='ineligible'} bank={currentBank} close={() => setModal('none')}/>
    </>
    :
    <>
     <SplashScreen login={() => setModal('login')} signup={() => setModal('signup')}/>
     <Login show={modal==='login'} close={() => setModal('none')}
      success={() => setLoggedIn(true)}/>
     <Signup show={modal==='signup'} close={() => setModal('none')}
      success={() => setLoggedIn(true)}/>
    </>
  );
}

export default App;

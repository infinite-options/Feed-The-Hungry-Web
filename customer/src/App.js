import React, {useState} from 'react';

import SplashScreen from './SplashScreen.js';
import Login from './Login.js';
import Signup from './Signup.js';
import FoodBankList from './FoodBankList.js';
import Browse from './Browse.js';

let foodbanks = [
  {name: 'Food Not Bombs', food: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Orange'}]},
  {name: 'Santa Cruz Food Bank', food: [{name: 'Chicken'}, {name: 'Filet Mignon'}, {name: 'Ribeye'}]},
  {name: 'West Valley Community Center', food: [{name: 'Broccoli'}, {name: 'Asparagus'}, {name: 'Avocado'}]},
  {name: 'Second Harvest Food Bank', food: [{name: 'Milk'}, {name: 'Water'}, {name: 'Lemonade'}]},
  {name: 'Monterey County Food Bank', food: [{name: 'Apple'}, {name: 'Chicken'}, {name: 'Milk'}]},
  {name: 'H.O.P.E Calling Food Pantry', food: [{name: 'Banana'}, {name: 'Ribeye'}, {name: 'Orange'}]}
];

function App() {
  const [modal, setModal] = useState('none');
  const [loggedIn, setLoggedIn] = useState(true);
  const [view, setView] = useState('list');
  const [currentBank, setCurrentBank] = useState(foodbanks[0]);

  return (
    loggedIn ? 
    <>
      {view === 'list' ? <FoodBankList foodbanks={foodbanks} select={bank=>{setCurrentBank(bank); setView('bank')}}/> :
       view === 'bank' ? <Browse bank={currentBank} back={()=>setView('list')}/> :
       view === 'checkout' ? '' : ''}
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

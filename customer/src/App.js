import React, {useState} from 'react';

import SplashScreen from './SplashScreen.js';
import Login from './Login.js';

function App() {
  const [modal, setModal] = useState('login');
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <></>
    );
  } else {
    return (
      <>
        <SplashScreen login={() => setModal('login')} />
        <Login show={modal==='login'} close={() => setModal('none')}
         loginSuccess={() => setLoggedIn(true)}/>
      </>
    );
  }
}

export default App;

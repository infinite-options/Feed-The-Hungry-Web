import React, {useState} from 'react';

import SplashScreen from './SplashScreen.js';
import Login from './Login.js';
import Signup from './Signup.js';

function App() {
  const [modal, setModal] = useState('none');
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return (
      <>
        {/* todo: store list, browse, checkout */}
      </>
    );
  } else {
    return (
      <>
        <SplashScreen login={() => setModal('login')} signup={() => setModal('signup')}/>
        <Login show={modal==='login'} close={() => setModal('none')}
         success={() => setLoggedIn(true)}/>
        <Signup show={modal==='signup'} close={() => setModal('none')}
         success={() => setLoggedIn(true)}/>
      </>
    );
  }
}

export default App;

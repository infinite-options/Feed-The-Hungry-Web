import React from 'react';
import {Jumbotron, Button} from 'react-bootstrap';

function SplashScreen(props) {
    return (
        <Jumbotron>
            {/* todo: prettify, link to sign up */}
            <h1>Welcome to Serving Now</h1>
            <p>Helping the hungry find the food they need</p>
            <Button onClick={props.login} className='mx-3'>Log in</Button>
            <Button onClick={props.signup} className='mx-3'>Sign up</Button>
        </Jumbotron>
    );
}

export default SplashScreen;
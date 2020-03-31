import React from 'react';
import {Button} from 'react-bootstrap';

function SplashScreen(props) {
    return (
        <>
            <h1>Welcome to Serving Now</h1>
            <Button onClick={props.login}>Log in</Button>
        </>
    );
}

export default SplashScreen;
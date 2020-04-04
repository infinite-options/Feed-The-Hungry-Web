import React from 'react';
import {Jumbotron, Button, Container, Row} from 'react-bootstrap';

import './SplashScreen.css';

function SplashScreen(props) {
  return (
    <Jumbotron>
      <div className='filter text-white'>
        <Container className='d-flex flex-column text-center'>
          <h1 className='display-1 font-weight-bold'>Serving Now</h1>
          <p className='h3'>Helping the hungry find the food they need</p>
          <Row className='align-self-center d-flex justify-content-between'>
            <Button onClick={props.login}>Log in</Button>
            <Button onClick={props.signup}>Sign up</Button>
          </Row>
        </Container>
      </div>
    </Jumbotron>
  );
}

export default SplashScreen;
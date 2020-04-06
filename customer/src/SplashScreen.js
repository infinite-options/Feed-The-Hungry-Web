import React from 'react';
import {Jumbotron, Button, Container, Row, Form, InputGroup} from 'react-bootstrap';
import {Lock, Envelope, Eye, EyeSlash} from 'react-bootstrap-icons';

import './SplashScreen.css';

function SplashScreen(props) {
  const [pwordHidden, setPwordHidden] = React.useState(true);
  const [badLogin, setBadLogin] = React.useState(false);

  const submitLogin = event => {
    event.preventDefault();
    var form = event.target;
    var email = document.querySelector('#login-email');
    var pword = document.querySelector('#login-pword');
    if (form.checkValidity()) {
       console.log('valid form: email ('+email.value+') password ('+pword.value+')');
       // try login to server, return false if bad credentials
       var loginSuccess = true;
       if (loginSuccess) {
          props.success();
       } else {
          setBadLogin(true);
       }
    } else {
       console.log('invalid form');
       form.classList.add('was-validated');
    }
    return false;
 }

  return (
    <Jumbotron>
      <div className='filter text-white'>
        <Container className='d-flex flex-column text-center'>
          <h1 className='display-1 font-weight-bold'>Serving Now</h1>
          <p className='h3'>Helping the hungry find the food they need</p>
          <Row className='align-self-center d-flex justify-content-between'>
            <Form className='d-flex flex-column' id='login-form' onSubmit={submitLogin} noValidate>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <Envelope />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control placeholder='email' id='login-email' required/>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Enter your email address
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <Lock />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control type={pwordHidden ? 'password' : 'text'}
                  placeholder='password' id='login-pword' required/>
                  <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                    <InputGroup.Text>
                      {pwordHidden ? (
                        <EyeSlash />
                      ) : (
                        <Eye />
                      )}
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  Enter your password
                </Form.Control.Feedback>
              </Form.Group>
              <Button type='submit' className='align-self-center w-50'>Log in</Button>
            </Form>
          </Row>
          <Row>
            <Button onClick={props.login}>Log in</Button>
            <Button onClick={props.signup}>Sign up</Button>
          </Row>
        </Container>
      </div>
    </Jumbotron>
  );
}

export default SplashScreen;
import React from 'react';
import { Redirect } from 'react-router-dom';
import {Jumbotron, Button, Container, Row, Form, InputGroup} from 'react-bootstrap';
import {Lock, Envelope, Eye, EyeSlash} from 'react-bootstrap-icons';

import Signup from './Signup.js';
import './SplashScreen.css';

function SplashScreen() {
  const [signupShown, setSignupShown] = React.useState(false);
  const [pwordHidden, setPwordHidden] = React.useState(true);
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const updateLogin = () => {
    var form = document.querySelector('#login-form');
    if (form.classList.contains('was-validated')) {
      var email = document.querySelector('#login-email');
      email.parentElement.classList.remove('is-valid', 'is-invalid');
      email.parentElement.classList.add(email.checkValidity() ? 'is-valid' : 'is-invalid');
      var pword = document.querySelector('#login-pword');
      pword.parentElement.classList.remove('is-valid', 'is-invalid');
      pword.parentElement.classList.add(pword.checkValidity() ? 'is-valid' : 'is-invalid');
    }
  }

  const submitLogin = event => {
    event.preventDefault();
    var form = event.target;
    var email = document.querySelector('#login-email');
    var pword = document.querySelector('#login-pword');
    if (form.checkValidity()) {
      fetch('http://api.hashify.net/hash/sha256/hex?value='+pword.value)
      .then(res => {
        return res.json();
      }).then(data => {
        console.log('valid form: '+email.value+', '+data.Digest);
      }).catch(error => {
        console.log('valid form, hashing failure: '+email.value);
      });
      // try login to server, return false if bad credentials
      var success = true;
      setLoginSuccess(success);
    } else {
      console.log('invalid form');
      form.classList.add('was-validated');
      updateLogin();
    }
    return false;
 }

  return (
    loginSuccess ? (
      <Redirect from='/' to='/list' />
    ) : (
      <Jumbotron>
        <div className='filter text-white'>
          <Container className='d-flex flex-column text-center'>
            <div id='header'>
              <h1 className='display-1 font-weight-bold pb-3'>Serving Now</h1>
              <p className='h3 mt-3'>Helping the hungry find the food they need</p>
            </div>
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
                    <Form.Control placeholder='email' id='login-email' required onInput={updateLogin}/>
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
                    placeholder='password' id='login-pword' required onInput={updateLogin}/>
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
                <Button type='submit' className='align-self-center w-50 my-3'>Log in</Button>
                <span className='my-3'>
                  No account? <a href='#' onClick={()=>setSignupShown(true)} className='text-decoration-none'>Sign up</a>
                </span>
              </Form>
            </Row>
          </Container>
        </div>
        <Signup show={signupShown} close={() => setSignupShown(false)}
          success={() => setLoginSuccess(true)}/>
      </Jumbotron>
    )
  );
}

export default SplashScreen;
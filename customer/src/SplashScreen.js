import React from 'react';
import { Redirect } from 'react-router-dom';
import {Jumbotron, Button, Container, Row, Form, InputGroup} from 'react-bootstrap';
import {MdLockOutline} from 'react-icons/md';
import {FiMail} from 'react-icons/fi';
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';


import Signup from './Signup.js';
import './SplashScreen.css';

function SplashScreen() {
  const [signupShown, setSignupShown] = React.useState(false);
  const [pwordHidden, setPwordHidden] = React.useState(true);
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const submitLogin = event => {
    event.preventDefault();
    var form = event.target;
    var email = document.querySelector('#login-email');
    var pword = document.querySelector('#login-pword');
    if (form.checkValidity()) {
      fetch('https://api.hashify.net/hash/sha256/hex?value='+pword.value)
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
    }
    return false;
 }

 const login = () => {
   setLoginSuccess(true);
 }

  return (
    loginSuccess ? (
      <Redirect from='/' to='/list' />
    ) : (
      <Jumbotron>
        <div className='filter text-white'>
          <Container className='d-flex flex-column text-center'>
            <div id='header'>
              <h1 className='display-4 font-weight-bold pb-3'>Feed the Hungry</h1>
            </div>
            <Row className='align-self-center d-flex justify-content-between'>
              <Form className='d-flex flex-column' id='login-form' onSubmit={submitLogin} noValidate>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FiMail />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control placeholder='email' id='login-email' required/>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <MdLockOutline />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type={pwordHidden ? 'password' : 'text'}
                    placeholder='password' id='login-pword' required/>
                    <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                      <InputGroup.Text>
                        {pwordHidden ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
                <Button type='submit' className='align-self-center w-50 my-3'>Log in</Button>
                <span className='my-3'>
                  No account? <a href='#' onClick={()=>setSignupShown(true)} className='text-decoration-none'>Sign up</a>
                </span>
              </Form>
            </Row>
            <div className='g-signin2 mx-auto my-2' data-longtitle='true' data-width='195' data-height='28' data-theme='dark' data-onsuccess={login}></div>
            <div className='fb-login-button' data-button-type='continue_with' data-size='medium' data-onlogin={login}/>
          </Container>
        </div>
        <Signup show={signupShown} close={() => setSignupShown(false)}
          success={() => setLoginSuccess(true)}/>
      </Jumbotron>
    )
  );
}

export default SplashScreen;
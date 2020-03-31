import React, {useState} from 'react';
import {Modal, Form, InputGroup, Button} from 'react-bootstrap';

import { faEnvelope, faKey, faEye, faEyeSlash } 
   from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
   const [pwordHidden, setPwordHidden] = useState(true);
   const [badLogin, setBadLogin] = useState(false);

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
            window.location = 'index.html';
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
      <Modal show={true}>
         <Modal.Body>
            <p className='text-danger' hidden={!badLogin}>Invalid login, try again</p>
            <Form className='d-flex flex-column' id='login-form' onSubmit={submitLogin} noValidate>
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faEnvelope} />
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
                           <FontAwesomeIcon icon={faKey} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type={pwordHidden ? 'password' : 'text'}
                      placeholder='password' id='login-pword' required/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                     Enter your password
                  </Form.Control.Feedback>
               </Form.Group>
               <Button type='submit' className='align-self-center w-50'>Log in</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default Login;
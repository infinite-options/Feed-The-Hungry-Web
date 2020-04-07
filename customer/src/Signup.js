import React, {useState} from 'react';
import {Modal, Form, InputGroup, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } 
   from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
   const [pwordHidden, setPwordHidden] = useState(true);

   const updateSignup = () => {
      var form = document.querySelector('#signup-form');
      if (form.classList.contains('was-validated')) {
         var email = document.querySelector('#signup-email');
         email.parentElement.classList.remove('is-valid', 'is-invalid');
         email.parentElement.classList.add(email.checkValidity() ? 'is-valid' : 'is-invalid');
         var pword = document.querySelector('#signup-pword');
         pword.parentElement.classList.remove('is-valid', 'is-invalid');
         pword.parentElement.classList.add(pword.checkValidity() ? 'is-valid' : 'is-invalid');
         var emailMatch = document.querySelector('#email-match');
         var emailDoesMatch = (email.value === emailMatch.value);
         emailMatch.parentElement.classList.remove('is-valid', 'is-invalid');
         emailMatch.parentElement.classList.add(emailDoesMatch ? 'is-valid' : 'is-invalid');
         emailMatch.setCustomValidity(emailDoesMatch ? '' : 'invalid');
         var pwordMatch = document.querySelector('#pword-match');
         var pwordDoesMatch = (pword.value === pwordMatch.value);
         pwordMatch.parentElement.classList.remove('is-valid', 'is-invalid');
         pwordMatch.parentElement.classList.add(pwordDoesMatch ? 'is-valid' : 'is-invalid');
         pwordMatch.setCustomValidity(pwordDoesMatch ? '' : 'invalid');
      }
   }

   const submitSignup = event => {
      event.preventDefault();
      var form = event.target;
      var email = document.querySelector('#signup-email');
      var pword = document.querySelector('#signup-pword');
      if (form.checkValidity()) {
         console.log('valid form: email ('+email.value+') password ('+pword.value+')');
         // try signup to server, return false if bad credentials
         var signupSuccess = true;
         if (signupSuccess) {
            props.success();
         }
      } else {
         console.log('invalid form');
         form.classList.add('was-validated');
         updateSignup();
      }
      return false;
   }

   return (
      <Modal show={props.show} onHide={props.close} centered>
         <Modal.Header closeButton>
            <Modal.Title>Create a new account</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className='d-flex flex-column' id='signup-form' onSubmit={submitSignup} noValidate>
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type='email' placeholder='email' id='signup-email' required
                      onInput={updateSignup}/>
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>
                     Enter a valid email address
                  </Form.Control.Feedback>
               </Form.Group>
               <Form.Group>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control placeholder='confirm email' id='email-match'
                      onInput={updateSignup}/>
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>
                     Emails must match
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
                      placeholder='password' id='signup-pword' required minLength={8}
                      onInput={updateSignup}/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>
                     Your password must be at least 8 characters long
                  </Form.Control.Feedback>
               </Form.Group>
               <Form.Group>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faKey} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type={pwordHidden ? 'password' : 'text'}
                      placeholder='confirm password' id='pword-match'
                      onInput={updateSignup}/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>
                     Passwords must match
                  </Form.Control.Feedback>
               </Form.Group>
               <Button type='submit' className='align-self-center w-50'>Sign up</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default Signup;
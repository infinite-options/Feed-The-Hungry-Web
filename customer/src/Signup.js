import React, {useState} from 'react';
import {Modal, Form, InputGroup, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } 
   from "@fortawesome/free-solid-svg-icons";

import './Signup.css';

function Signup(props) {
   const [pwordHidden, setPwordHidden] = useState(true);

   const fieldMatch = () => {
      var email = document.querySelector('#signup-email');
      var pword = document.querySelector('#signup-pword');
      var emailMatch = document.querySelector('#email-match');
      var pwordMatch = document.querySelector('#pword-match');
      var emailDoesMatch = (email.value === emailMatch.value);
      var pwordDoesMatch = (pword.value === pwordMatch.value);
      emailMatch.setCustomValidity(
         emailDoesMatch ? '' : 'invalid'
      );
      pwordMatch.setCustomValidity(
         pwordDoesMatch ? '' : 'invalid'
      );
      return (emailDoesMatch && pwordDoesMatch);
   }

   const submitSignup = event => {
      event.preventDefault();
      var form = event.target;
      var email = document.querySelector('#signup-email');
      var pword = document.querySelector('#signup-pword');
      if (form.checkValidity() && fieldMatch()) {
         console.log('valid form: email ('+email.value+') password ('+pword.value+')');
         // try signup to server, return false if bad credentials
         var signupSuccess = true;
         if (signupSuccess) {
            props.success();
         }
      } else {
         console.log('invalid form');
         form.classList.add('was-validated');
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
                      onInput={fieldMatch}/>
                     <Form.Control.Feedback type='invalid'>
                        Enter a valid email address
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>
               <Form.Group>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control placeholder='confirm email' id='email-match' required
                      onInput={fieldMatch}/>
                     <Form.Control.Feedback type='invalid'>
                        Emails must match
                     </Form.Control.Feedback>
                  </InputGroup>
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
                      onInput={fieldMatch}/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                     <Form.Control.Feedback type='invalid'>
                        Your password must be at least 8 characters long
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>
               <Form.Group>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faKey} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type={pwordHidden ? 'password' : 'text'}
                      placeholder='confirm password' id='pword-match' required
                      onInput={fieldMatch}/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                     <Form.Control.Feedback type='invalid'>
                        Passwords must match
                     </Form.Control.Feedback>
                  </InputGroup>
               </Form.Group>
               <Button type='submit' className='align-self-center w-50'>Sign up</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default Signup;
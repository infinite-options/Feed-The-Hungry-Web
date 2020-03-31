import React, {useState} from 'react';
import {Modal, Form, InputGroup, Button} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } 
   from "@fortawesome/free-solid-svg-icons";

function Signup(props) {
   const [pwordHidden, setPwordHidden] = useState(true);
   const [badSignup, setBadSignup] = useState(false);

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
         } else {
            setBadSignup(true);
         }
      } else {
         console.log('invalid form');
         form.classList.add('was-validated');
      }
      return false;
   }

   return (
      <Modal show={props.show} onHide={props.close}>
         <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <p className='text-danger' hidden={!badSignup}>Invalid signup, try again</p>
            <Form className='d-flex flex-column' id='signup-form' onSubmit={submitSignup} noValidate>
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                     <InputGroup.Prepend>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control placeholder='email' id='signup-email' required/>
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
                     <Form.Control placeholder='confirm email' id='email-match' required/>
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
                      placeholder='password' id='signup-pword' required/>
                     <InputGroup.Append onClick={() => setPwordHidden(!pwordHidden)}>
                        <InputGroup.Text>
                           <FontAwesomeIcon icon={pwordHidden ? faEyeSlash : faEye}
                            id='hide-icon' />
                        </InputGroup.Text>
                     </InputGroup.Append>
                  </InputGroup>
                  <Form.Control.Feedback type='invalid'>
                     Enter your password
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
                      placeholder='confirm password' id='pword-match' required/>
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
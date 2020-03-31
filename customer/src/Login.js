import React, {useState} from 'react';
import {Modal, Form, InputGroup, Button} from 'react-bootstrap';

function Login(props) {
   const [pwordHidden, setPwordHidden] = useState(true);
   const [badLogin, setBadLogin] = useState(false);

   const togglePassword = () => {
      var hideIcon = document.querySelector('#hideIcon');
      var pword = document.querySelector('#login-pword');
      if (pwordHidden) {
         hideIcon.className = 'fas fa-eye';
         pword.type = 'text';
      } else {
         hideIcon.className = 'fas fa-eye-slash';
         pword.type = 'password';
      }
      setPwordHidden(!pwordHidden);
   }

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
                           <i className='fas fa-envelope'/>
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
                           <i className='fas fa-key'/>
                        </InputGroup.Text>
                     </InputGroup.Prepend>
                     <Form.Control type='password' placeholder='password' id='login-pword' required/>
                     <InputGroup.Append onClick={togglePassword}>
                        <InputGroup.Text>
                           <i className='fas fa-eye-slash' id='hideIcon'/>
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
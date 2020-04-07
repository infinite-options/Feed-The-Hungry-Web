import React, {useState} from 'react';
import {Modal, Form, Button, Col, OverlayTrigger, Tooltip, InputGroup} from 'react-bootstrap';
import {Eye, EyeSlash} from 'react-bootstrap-icons';

import './Signup.css';

function Substitutions(props) {
   return (
      <Tooltip {...props}>
         Substitute any foods you have dietary restrictions against
         with foods that you can eat.
      </Tooltip>
   );
}

function Signup(props) {
   const [addrShown, setAddrShown] = useState(false);
   const [pwordHidden, setPwordHidden] = useState(true);
   const form = React.useRef(null);
   const first = React.useRef(null);
   const last = React.useRef(null);
   const dob = React.useRef(null);
   const email = React.useRef(null);
   const pword = React.useRef(null);
   const pwordMatch = React.useRef(null);
   const addr1 = React.useRef(null);
   const addr2 = React.useRef(null);
   const city = React.useRef(null);
   const state = React.useRef(null);
   const zip = React.useRef(null);
   const diet = React.useRef(null);
   const sub = React.useRef(null);

   const checkForm = () => {
      const pwordDoesMatch = pword.current.value === pwordMatch.current.value;
      pword.current.setCustomValidity(pwordDoesMatch ? '' : 'invalid');
      pwordMatch.current.setCustomValidity(pwordDoesMatch ? '' : 'invalid');
      state.current.setCustomValidity(addrShown && state.current.value === 'N/A' ? 'invalid' : '');
   }

   const submitSignup = event => {
      event.preventDefault();
      checkForm();
      if (form.current.checkValidity()) {
         console.log('valid form: email ('+email.value+') password ('+pword.value+')');
         // try signup to server, return false if bad credentials
         var signupSuccess = true;
         if (signupSuccess) {
            props.success();
         }
      } else {
         console.log('invalid form');
         form.current.classList.add('was-validated');
      }
      return false;
   }

   return (
      <Modal show={props.show} onHide={props.close} size='lg' centered>
         <Modal.Header closeButton>
            <Modal.Title>Create a new account</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className='d-flex flex-column' ref={form} onSubmit={submitSignup} noValidate>
               <Form.Row>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>First Name</Form.Label>
                     <Form.Control ref={first} type='text' placeholder='first' required/>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>Last Name</Form.Label>
                     <Form.Control ref={last} type='text' placeholder='last' required/>
                  </Form.Group>
               </Form.Row>
               <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control ref={dob} type='date' required min='1920-04-06' max='2002-04-06'/>
               </Form.Group>
               <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control ref={email} type='email' placeholder='email' required/>
               </Form.Group>
               <Form.Row>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>Password</Form.Label>
                     <InputGroup>
                        <Form.Control ref={pword} type={pwordHidden ? 'password' : 'text'}
                         placeholder='password' required onInput={checkForm}/>
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
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>Confirm Password</Form.Label>
                     <InputGroup>
                        <Form.Control ref={pwordMatch} type={pwordHidden ? 'password' : 'text'}
                         placeholder='confirm password' required onInput={checkForm}/>
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
                  </Form.Group>
               </Form.Row>
               <Form.Group>
                  <Form.Check type='radio' name='addr' inline label='Set permanent address'
                   checked={addrShown} onChange={()=>setAddrShown(true)}/>
                  <Form.Check type='radio' name='addr' inline label='Use current location'
                   checked={!addrShown} onChange={()=>setAddrShown(false)}/>
               </Form.Group>
               <div hidden={!addrShown}>
                  <Form.Group>
                     <Form.Label>Address</Form.Label>
                     <Form.Control type='text' placeholder='address' required={addrShown}/>
                  </Form.Group>
                  <Form.Group>
                     <Form.Label>Address 2</Form.Label>
                     <Form.Control type='text' placeholder='apartment'/>
                  </Form.Group>
                  <Form.Row>
                     <Form.Group as={Col} md={4}>
                        <Form.Label>City</Form.Label>
                        <Form.Control type='text' placeholder='city' required={addrShown}/>
                     </Form.Group>
                     <Form.Group as={Col} md={4}>
                        <Form.Label>State</Form.Label>
                        <Form.Control as='select' ref={state} onChange={checkForm}>
                           <option value="N/A">choose...</option>
                           <option value="AL">Alabama</option>
                           <option value="AK">Alaska</option>
                           <option value="AZ">Arizona</option>
                           <option value="AR">Arkansas</option>
                           <option value="CA">California</option>
                           <option value="CO">Colorado</option>
                           <option value="CT">Connecticut</option>
                           <option value="DE">Delaware</option>
                           <option value="DC">District Of Columbia</option>
                           <option value="FL">Florida</option>
                           <option value="GA">Georgia</option>
                           <option value="HI">Hawaii</option>
                           <option value="ID">Idaho</option>
                           <option value="IL">Illinois</option>
                           <option value="IN">Indiana</option>
                           <option value="IA">Iowa</option>
                           <option value="KS">Kansas</option>
                           <option value="KY">Kentucky</option>
                           <option value="LA">Louisiana</option>
                           <option value="ME">Maine</option>
                           <option value="MD">Maryland</option>
                           <option value="MA">Massachusetts</option>
                           <option value="MI">Michigan</option>
                           <option value="MN">Minnesota</option>
                           <option value="MS">Mississippi</option>
                           <option value="MO">Missouri</option>
                           <option value="MT">Montana</option>
                           <option value="NE">Nebraska</option>
                           <option value="NV">Nevada</option>
                           <option value="NH">New Hampshire</option>
                           <option value="NJ">New Jersey</option>
                           <option value="NM">New Mexico</option>
                           <option value="NY">New York</option>
                           <option value="NC">North Carolina</option>
                           <option value="ND">North Dakota</option>
                           <option value="OH">Ohio</option>
                           <option value="OK">Oklahoma</option>
                           <option value="OR">Oregon</option>
                           <option value="PA">Pennsylvania</option>
                           <option value="RI">Rhode Island</option>
                           <option value="SC">South Carolina</option>
                           <option value="SD">South Dakota</option>
                           <option value="TN">Tennessee</option>
                           <option value="TX">Texas</option>
                           <option value="UT">Utah</option>
                           <option value="VT">Vermont</option>
                           <option value="VA">Virginia</option>
                           <option value="WA">Washington</option>
                           <option value="WV">West Virginia</option>
                           <option value="WI">Wisconsin</option>
                           <option value="WY">Wyoming</option>
                        </Form.Control>
                     </Form.Group>
                     <Form.Group as={Col} md={4}>
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type='text' placeholder='zip' required={addrShown} pattern='[0-9]{5}'/>
                     </Form.Group>
                  </Form.Row>
               </div> 
               <Form.Row>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>Dietary Restrictions</Form.Label>
                     <Form.Check type='checkbox' name='diet' label='Vegan'/>
                     <Form.Check type='checkbox' name='diet' label='Vegetarian'/>
                     <Form.Check type='checkbox' name='diet' label='Gluten Free'/>
                     <Form.Check type='checkbox' name='diet' label='Halal'/>
                     <Form.Check type='checkbox' name='diet' label='Kosher'/>
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                     <Form.Label>
                        Opt in for {' '}
                        <OverlayTrigger placement='bottom' delay={ {show: 250, hide: 400} } overlay={Substitutions}>
                           <a href='#' className='text-decoration-none'>substitutions</a>
                        </OverlayTrigger>
                     </Form.Label>
                     <Form.Check type='radio' name='sub' label='Yes' defaultChecked/>
                     <Form.Check type='radio' name='sub' label='No'/>
                  </Form.Group>
               </Form.Row>
               <Button type='submit' className='align-self-center w-50'>Sign up</Button>
            </Form>
         </Modal.Body>
      </Modal>
   );
}

export default Signup;
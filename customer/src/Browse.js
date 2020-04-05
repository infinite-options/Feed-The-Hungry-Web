import React from 'react';
import {ListGroup, Container, Button, Row, Col} from 'react-bootstrap';

import {Plus, Dash, Bag, ArrowLeftShort} from 'react-bootstrap-icons';

import Cart from './Cart.js';


function Browse(props) {
   var startCounts = new Map();
   for (var item in props.bank.food) {
      startCounts.set(props.bank.food[item], 0);
   }
   const [itemCounts, setItemCounts] = React.useState(new Map(startCounts));
   const [cartShown, setCartShown] = React.useState(false);

   const decreaseItemCount = (item) => {
      console.log('decrease item'+item);
      var dict = new Map(itemCounts);
      dict.set(item, dict.get(item) > 0 ? dict.get(item)-1 : 0);
      setItemCounts(dict);
   } 
   const increaseItemCount = (item) => {
      console.log('increase item'+item);
      var dict = new Map(itemCounts);
      dict.set(item, dict.get(item) < item.max ? dict.get(item)+1 : item.max);
      setItemCounts(dict);
   } 
   const totalCount = () => {
      var total = 0;
      for (var item in props.bank.food) {
         total += itemCounts.get(props.bank.food[item]);
      }
      return total;
   }

   const cart = () => {
      var cart = [];
      for (var item in props.bank.food) {
         if (itemCounts.get(props.bank.food[item]) > 0) {
            cart.push({item: props.bank.food[item], count: itemCounts.get(props.bank.food[item])});
         }
      }
      return cart;
   }

   return (
      <Container>
         <Row className='d-flex justify-content-around'>
            <ArrowLeftShort onClick={props.back} size={48}/>
            <h1>{props.bank.name}</h1>
            <span>
               <Bag onClick={() => setCartShown(true)} size={48} className='m-0 p-0'/>
               <p className='h3 d-inline'>{totalCount()}</p>
            </span>
         </Row>
         <Row>
            <ListGroup variant='flush' className='flex-fill'>
               {props.bank.food.map(item => (
                  <ListGroup.Item key={props.bank.id} className='m-0 d-flex flex-row justify-content-between'>
                     <Col className='align-self-center' xs={8}>
                        {item.name}
                     </Col>
                     <Col xs={4} className='d-flex flex-row justify-content-between'>
                        <Dash onClick={()=>decreaseItemCount(item)} className='align-self-center'/>
                        <span className='align-self-center'>
                           {itemCounts.get(item)+'/'+item.max}
                        </span>
                        <Plus onClick={()=>increaseItemCount(item)} className='align-self-center'/>
                     </Col>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Row>
         <Cart show={cartShown} hide={()=>setCartShown(false)} cart={cart()}/>
      </Container>
   );
}

export default Browse;
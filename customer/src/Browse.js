import React from 'react';
import {Link} from 'react-router-dom';
import {ListGroup, Container, Row} from 'react-bootstrap';

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
      <Container fluid className='p-3'>
         <Row className='d-flex justify-content-around'>
            <Link to='/list'>
               <ArrowLeftShort onClick={props.back} size={48} color='black'/>
            </Link>
            <h1>{props.bank.name}</h1>
            <span>
               <Bag onClick={() => setCartShown(true)} size={48} className='m-0 p-0'/>
               <p className='h3 d-inline'>{totalCount()}</p>
            </span>
         </Row>
         <Container>
            <ListGroup variant='flush' className='flex-fill'>
               {props.bank.food.map(item => (
                  <ListGroup.Item key={props.bank.id} className='m-0 d-flex flex-row justify-content-between'>
                     <div className='align-self-center' xs={8}>
                        {item.name}
                     </div>
                     <div className='float-right'>
                        <Dash onClick={()=>decreaseItemCount(item)} className='align-self-center'/>
                        <span className='align-self-center mx-1'>
                           {itemCounts.get(item)+'/'+item.max}
                        </span>
                        <Plus onClick={()=>increaseItemCount(item)} className='align-self-center'/>
                     </div>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Container>
         <Cart show={cartShown} hide={()=>setCartShown(false)} cart={cart()}/>
      </Container>
   );
}

export default Browse;
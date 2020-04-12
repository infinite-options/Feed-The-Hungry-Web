import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ListGroup, Container, Row} from 'react-bootstrap';

import {FiPlus, FiMinus} from 'react-icons/fi';
import {IoIosArrowBack} from 'react-icons/io';
import {FaShoppingCart} from 'react-icons/fa';

import Cart from './Cart.js';

class Browse extends Component {
   constructor(props) {
      super(props);
      this.state = {
         itemCounts: new Map(),
         cartShown: false,
         inventory: [],
         loaded: false
      }
   }

   initialize = async() => {
      let response = await fetch('https://feed-the-hungry.netlify.com/api/inventory/'+this.props.bank.id+'/');
      let data = await response.json();
      console.log('got inventory');
      var inventory = [];
      var items = new Map();
      data.forEach(async(datapoint) => {
         let fres = await fetch('https://feed-the-hungry.netlify.com/api/food/'+datapoint.id+'/');
         let fdata = await fres.json();
         console.log('got food item');
         var entry = {
            item: fdata,
            qty: datapoint.qty,
            max: datapoint.max
         }
         inventory.push(entry);
         items.set(fdata, 0);
      });
      console.log(items);
      this.setState({
         inventory,
         itemCounts: items
      }, ()=>this.setState({loaded: true}));
   }

   componentDidMount() {
      this.initialize();
   }
   componentDidUpdate() {
      console.log(this.state.loaded);
      console.log(this.state.inventory);
      console.log(this.state.itemCounts);
   }

   decreaseItemCount = (item) => {
      var dict = new Map(this.state.itemCounts);
      dict.set(item, dict.get(item) > 0 ? dict.get(item)-1 : 0);
      this.setState({itemCounts: dict});
   } 
   increaseItemCount = (item, max) => {
      var dict = new Map(this.state.itemCounts);
      var maxval = parseInt(max);
      dict.set(item, dict.get(item) < maxval ? dict.get(item)+1 : maxval);
      this.setState({itemCounts: dict});
   } 
   totalCount = () => {
      var total = 0;
      this.state.itemCounts.forEach((v, k, m) => {
         total += v;
      });
      return total;
   }

   cart = () => {
      var cart = [];
      this.state.itemCounts.forEach((v, k, m) => {
         if (v > 0) {
            cart.push({item: k, count: v});
         }
      });
      return cart;
   }

   render() {
      if (!this.state.loaded) {
         return <h1>Loading...</h1>;
      }
      return (
         <Container fluid>
            <Row className='d-flex justify-content-around bg-primary p-3'>
               <Link to='/list'>
                  <IoIosArrowBack size={48} color='black'/>
               </Link>
               <h1>{this.props.bank.name}</h1>
               <span>
                  <FaShoppingCart onClick={() => this.setState({cartShown: true})}
                   size={48} className='m-0 p-0'/>
                  <p className='h3 d-inline'>{this.totalCount()}</p>
               </span>
            </Row>
            <Container>
               {this.state.inventory}
               <ListGroup variant='flush' className='flex-fill'>
                  {this.state.inventory.map(entry => (
                     <ListGroup.Item key={entry.item.name} className='m-0 py-3 d-flex flex-row justify-content-between'>
                        <span className='py-3 flex-fill'>
                           <div className='align-self-center float-left'>
                              {entry.item.name}
                           </div>
                           <div className='float-right col-6 col-md-3 d-flex justify-content-between'>
                              <FiMinus onClick={()=>this.decreaseItemCount(entry.item)} className='align-self-center'/>
                              <span className='align-self-center mx-1'>
                                 {this.state.itemCounts.get(entry.item)+'/'+entry.max}
                              </span>
                              <FiPlus onClick={()=>this.increaseItemCount(entry.item, entry.max)} className='align-self-center'/>
                           </div>
                        </span>
                     </ListGroup.Item>
                  ))}
               </ListGroup>
            </Container>
            <Cart hide={()=>this.setState({cartShown: false})}
             show={this.state.cartShown} cart={this.cart()}/>
         </Container>
      );
   }
}

export default Browse;
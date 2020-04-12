import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {FiPlus, FiMinus} from 'react-icons/fi';

class ItemList extends React.Component {
  render() {
    return(
      <ListGroup variant='flush' className='flex-fill'>
        {this.props.inventory.map(entry => (
          <ListGroup.Item key={entry.item.name} className='m-0 py-3 d-flex flex-row justify-content-between'>
            <span className='py-3 flex-fill'>
              <div className='align-self-center float-left'>
                {entry.item.name}
              </div>
              <div className='float-right col-6 col-md-3 d-flex justify-content-between'>
                <FiMinus onClick={()=>this.props.decrease(entry.item)} className='align-self-center'/>
                <span className='align-self-center mx-1'>
                  {this.props.itemCounts.get(entry.item)+'/'+entry.max}
                </span>
                <FiPlus onClick={()=>this.props.increase(entry.item, entry.max)} className='align-self-center'/>
              </div>
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
}

export default ItemList;
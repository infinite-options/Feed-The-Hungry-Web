import React from 'react';
import {ListGroup} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  } 
   from "@fortawesome/free-solid-svg-icons";

function FoodBankList(props) {

    return (
        <>
            <h1>Food Bank List</h1>
            <ListGroup>
                {props.foodbanks.map(bank => (
                    <ListGroup.Item onClick={()=>props.select(bank)}>
                        {bank.name}, {bank.food.length} items
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default FoodBankList;
import React from 'react';
import {ListGroup} from 'react-bootstrap';

function Browse(props) {
    return (
        <>
            <h1>{props.bank.name}</h1>
            <ListGroup>
                {props.bank.food.map(item => (
                    <ListGroup.Item onClick={props.back}>
                        {item.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}

export default Browse;
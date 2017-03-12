/**
 * Created by cwarren on 3/8/17.
 */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function(props){
    return(
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                {props.title}
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
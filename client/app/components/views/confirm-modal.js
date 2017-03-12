/**
 * Created by cwarren on 3/9/17.
 */
import React from 'react';
import FormModal from './form-modal';
import { Button, ButtonToolbar } from 'react-bootstrap';

export default props => {
    return(
        <FormModal show={props.show} onHide={props.onHide} >
            <p>Are you sure?</p>
            <ButtonToolbar>
                <Button bsStyle="danger" onClick={props.onYes}>Yes</Button>
                <Button bsStyle="primary" onClick={props.onNo}>No</Button>
            </ButtonToolbar>
        </FormModal>
    );
}
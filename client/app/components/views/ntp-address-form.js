/**
 * Created by cwarren on 3/12/17.
 */
import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default function(props){
    return(
        <Form onSubmit={props.onSubmit}>
            <FormGroup>
                <ControlLabel>Server Address</ControlLabel>
                <FormControl id="address" type="text" onChange={props.onChange} value={props.address} />
            </FormGroup>
            <Button type="submit" className="btn btn-lg btn-primary btn-block">Submit</Button>
        </Form>
    );
}
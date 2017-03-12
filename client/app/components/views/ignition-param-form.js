/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Table } from 'react-bootstrap';

export default function(props){
    return(
        <div className="container-fluid">
            <div>
                <Form onSubmit={props.onSubmit} onChange={props.onChange}>
                    <FormGroup>
                        <ControlLabel>Parameter Name</ControlLabel>
                        <FormControl id="param" type="text" value={props.data.param} required />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Value</ControlLabel>
                        <FormControl id="value" type="text" value={props.data.value} required />
                    </FormGroup>
                    <Button type="submit" className="btn btn-lg btn-primary btn-block">Submit</Button>
                </Form>
            </div>
        </div>
    );
}
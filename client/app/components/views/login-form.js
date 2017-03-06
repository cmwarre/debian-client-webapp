import React from 'react';
import {Col, FormGroup, ControlLabel, FormControl, Button, Checkbox} from 'react-bootstrap';

export default function(props){
    return(
        <div className="container-fluid">
            <div className="signin-form-container">
                <form className="form-signin" onSubmit={props.onSubmit}>
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <FormGroup>
                        <FormControl controlId="email" type="email" placeholder="Email address" required autofocus />
                        <FormControl controlId="password" type="password" placeholder="Password" required />
                        <Checkbox contolId="remember-me">Remember me</Checkbox>
                        <Button type="submit" className="btn btn-lg btn-primary btn-block">Sign in</Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    );
}
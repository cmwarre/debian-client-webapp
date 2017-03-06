import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

var AppLayout = React.createClass({

    render: function(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <IndexLinkContainer to="/">
                                <Navbar.Brand>
                                    Tamaki React Boilerplate
                                </Navbar.Brand>
                            </IndexLinkContainer>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <LinkContainer to="/">
                                    <NavItem eventKey={1}>
                                        <FontAwesome name="home" /> Home
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/about">
                                    <NavItem eventKey={2}>
                                        <FontAwesome name="info" /> About
                                    </NavItem>
                                </LinkContainer>
                                <LinkContainer to="/contact">
                                    <NavItem eventKey={3}>
                                        <FontAwesome name="phone" /> Contact
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                            <Nav pullRight>
                                <LinkContainer to="/login">
                                    <NavItem eventKey={4}>
                                        <FontAwesome name="sign-in" /> Login
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container-fluid">
                        <div className="row">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="container-fluid footer">
                        <div className="row">
                            <div className="container">
                                <p className="text-muted text-center">© 2016 Tamaki Control Ltd. All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default AppLayout;
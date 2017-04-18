import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

var AppLayout = React.createClass({

    target: "server",

    noVNCRedirect: function(){
        window.location = "/noVNC/";
    },

    render: function(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <IndexLinkContainer to="/">
                                <Navbar.Brand>
                                    Client Setup
                                </Navbar.Brand>
                            </IndexLinkContainer>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <LinkContainer to="/network">
                                    <NavItem eventKey={1}>
                                        Network
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                            <Nav>
                                <LinkContainer to="/ntp">
                                    <NavItem eventKey={1}>
                                        Time Synchronization
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                            { this.target == "client" ?
                                <Nav>
                                    <LinkContainer to="/ignition">
                                        <NavItem eventKey={1}>
                                            Ignition
                                        </NavItem>
                                    </LinkContainer>
                                </Nav> : null
                            }
                            <Nav>
                                <NavItem eventKey={2} href="/noVNC/" target="_blank" onSelect={this.noVNCRedirect}>
                                        <FontAwesome name="television" /> noVNC
                                </NavItem>
                            </Nav>
                            <Nav pullRight>
                                <LinkContainer to="/login">
                                    <NavItem eventKey={3}>
                                        <FontAwesome name="sign-in" /> Login
                                    </NavItem>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="container">
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
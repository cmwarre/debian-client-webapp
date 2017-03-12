import React from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button, Panel} from 'react-bootstrap';

export default function(props){

    if(props.data) {
        console.log(props.data);
        let dns_nameservers = props.data.dns_nameservers ? props.data.dns_nameservers : [];
        return (
            <div className="container-fluid">
                <div>
                    <Form onSubmit={props.onSubmit} onChange={props.onChange}>
                        <h2>Network Settings</h2>
                        <FormGroup>
                            <ControlLabel>Hostname</ControlLabel>
                            <FormControl id="hostname" type="text" onChange={props.onChange} value={props.data.hostname}
                                         required/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Domain Name</ControlLabel>
                            <FormControl id="domain" type="text" onChange={props.onChange}
                                         value={props.data.domain_name} required/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Network Type</ControlLabel>
                            <FormControl id="type" onChange={props.onChange} componentClass="select"
                                         value={props.data.type} required>
                                <option value="dhcp">DHCP</option>
                                <option value="static">Static</option>
                            </FormControl>
                        </FormGroup>

                        <Panel collapsible expanded={props.data.type == "static"}>
                            <FormGroup controlId="address">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl type="text" onChange={props.onChange} value={props.data.address}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Netmask</ControlLabel>
                                <FormControl id="netmask" type="text" onChange={props.onChange}
                                             value={props.data.netmask}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>Gateway</ControlLabel>
                                <FormControl id="network" type="text" onChange={props.onChange}
                                             value={props.data.gateway}/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>DNS Nameservers</ControlLabel>
                                <FormControl id="dns_nameservers" type="text" onChange={props.onChange}
                                             value={dns_nameservers.join(",")}/>
                            </FormGroup>
                        </Panel>

                        <Button type="submit" className="btn btn-lg btn-primary btn-block">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }else
        return(<div></div>);
}
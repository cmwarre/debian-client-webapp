/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Table } from 'react-bootstrap';

import FormModal from './form-modal';
import IgnitionParamFormContainer from '../containers/ignition-param-form-container';

export default function(props){
    if(props.data){
            let projects = props.projects ? props.projects : [];
            let projectControl = projects.length ?
                <FormControl id="project" componentClass="select" value={props.data.project} onChange={props.onChange} required >
                    {projects.map(project => {
                        return <option key={project.name}>{project.name}</option>;
                    })}
                </FormControl> :
                <FormControl id="project" type="text" value={props.data.project} onChange={props.onChange} required />

        return(
            <div className="container-fluid">
                <div>
                    <Form onSubmit={props.onSubmit} onChange={props.onChange}>
                        <h2>Ignition Settings</h2>
                        <FormGroup>
                            <ControlLabel>Gateway Address</ControlLabel>
                            <FormControl id="address" type="text" onChange={props.onChange} value={props.data.address} required />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Project Name</ControlLabel>
                            {projectControl}
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Window Mode</ControlLabel>
                            <FormControl id="windowmode" componentClass="select" onChange={props.onChange} value={props.data.windowmode} required >
                                <option value="fullscreen">Fullscreen</option>
                                <option value="windowed">Windowed</option>
                            </FormControl>
                        </FormGroup>

                        <Button onClick={props.onAddParam} bsStyle="primary">Add</Button>
                        <FormModal title="Project Parameter" show={props.showParamForm} onHide={props.onHideParamForm}>
                            <IgnitionParamFormContainer
                                onSubmit={props.onSubmitParam}
                                data={props.selectedParam}
                            />
                        </FormModal>

                        <Table striped bordered condensed hover>
                            <thead>
                              <tr>
                                <th>Property</th>
                                <th>Value</th>
                                  <th></th>
                              </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(props.data.launch_params).map(param => {
                                        return (
                                            <tr key={param}>
                                                <td>{param}</td>
                                                <td>{props.data.launch_params[param]}</td>
                                                <td>
                                                    <ButtonToolbar>
                                                        <Button bsStyle="warning" onClick={props.onEditParam.bind(null, param)}>Edit</Button>
                                                        <Button bsStyle="danger" onClick={props.onRemoveParam.bind(null, param)}>Remove</Button>
                                                    </ButtonToolbar>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                          </Table>

                        <Button type="submit" className="btn btn-lg btn-primary btn-block">Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
    else
        return(<div></div>)
}
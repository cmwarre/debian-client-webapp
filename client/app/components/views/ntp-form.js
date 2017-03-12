/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, ButtonToolbar, Button, Table } from 'react-bootstrap';

export default function(props){

    let servers = props.data ? props.data.servers : [];
    return(
        <div className="container-fluid">
            <div>
                <Form onSubmit={props.onSubmit} onChange={props.onChange}>
                    <h2>NTP Settings</h2>

                    <Button bsStyle="primary" onClick={props.onAdd}>
                        Add
                    </Button>
                    <Table striped bordered condensed hover>
                        <thead>
                          <tr>
                                <th>Server</th>
                                <th></th>
                          </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(servers).map(i => {
                                    return (
                                        <tr key={i}>
                                            <td>{props.data.servers[i]}</td>
                                            <td>
                                                <ButtonToolbar>
                                                    <Button bsStyle="warning" onClick={props.onEdit.bind(null, i)}>
                                                        Edit
                                                    </Button>
                                                    <Button bsStyle="danger" onClick={props.onDelete.bind(null, i)}>
                                                        Delete
                                                    </Button>
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
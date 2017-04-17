/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import NetworkForm from '../views/network-form';
import * as api from '../../api/index';
import ConfirmModal from '../views/confirm-modal';

const NetworkFormContainer = React.createClass({

    getInitialState: function(){
        return({
            data: null,
            showConfirmModal: false
        });
    },

    componentDidMount: function(){
        api.getNetworkSettings(response => {
            this.setState({data: response.data});
        });
    },

    onSubmit: function(event){
        event.preventDefault();
        this.toggleConfirmModal();
    },

    onSubmitImpl: function(){
        api.postNetworkSettings({data: this.state.data});
        this.toggleConfirmModal();
    },

    onChange: function(event){
        let _state = this.state.data;

        if(event.target.id == "dns_nameservers")
            _state[event.target.id] = event.target.value.trim().split(",");
        else
            _state[event.target.id] = event.target.value;

        this.setState({data: _state});
    },

    toggleConfirmModal: function () {
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    },

    render: function(){
        return(
            <div>
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.toggleConfirmModal}
                    onYes={this.onSubmitImpl}
                />
                <NetworkForm
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    data={this.state.data}
                />
            </div>
        );
    }
});

export default NetworkFormContainer;
/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import NTPForm from '../views/ntp-form';
import ConfirmModal from '../views/confirm-modal';
import NTPAddressFormContainer from './ntp-address-form-container';
import FormModal from '../views/form-modal';
import * as api from '../../api/index';


const NTPFormContainer = React.createClass({

    getInitialState: function(){
        return({
            data: null,
            showConfirmModal: false,
            showAddressForm: false,
            address: "",
            index: -1,
        });
    },

    componentDidMount: function(){
        api.getNTPSettings(response => {
            this.setState({data: response.data});
        });

    },

    onSubmit: function(event){
        event.preventDefault();
        this.toggleConfirmModal();
    },

    onSubmitImpl: function(){
        api.postNTPSettings({data: this.state.data});
        this.toggleConfirmModal();
    },

    toggleConfirmModal: function(){
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    },

    toggleAddressForm: function(){
        this.setState({showAddressForm: !this.state.showAddressForm});
    },

    onAddAddress: function(){
        this.setState({
            address: "",
            index: -1
        });
        this.toggleAddressForm();
    },

    onEditAddress: function(i){
        this.setState({
            address: this.state.data.servers[i],
            index: i
        });
        this.toggleAddressForm();
    },

    onDeleteAddress: function(i){
        let _data = this.state.data;
        _data.servers.splice(i, 1);
        this.setState({data: _data})
    },

    onSubmitAddress: function(data){
        let _data = this.state.data;

        if(data.index > -1){
            _data.servers[data.index] = data.address;
        }else{
            _data.servers.push(data.address);
        }
        this.setState({data: _data});
        this.toggleAddressForm();
    },

    render: function(){
        return(
            <div>
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.toggleConfirmModal}
                    onYes={this.onSubmitImpl}
                />
                <FormModal
                    show={this.state.showAddressForm}
                    onHide={this.toggleAddressForm}
                    title="Timeserver Address"
                >
                    <NTPAddressFormContainer
                        address={this.state.address}
                        index={this.state.index}
                        onSubmit={this.onSubmitAddress}
                    />
                </FormModal>
                <NTPForm
                    onSubmit={this.onSubmit}
                    data={this.state.data}
                    onAdd={this.onAddAddress}
                    onEdit={this.onEditAddress}
                    onDelete={this.onDeleteAddress}
                />
            </div>
        );
    }
});

export default NTPFormContainer;
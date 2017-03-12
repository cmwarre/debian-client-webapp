import React from 'react';
import axios from 'axios';
import IgnitionForm from '../views/ignition-form';
import * as api from '../../api/index';

import ConfirmModal from '../views/confirm-modal';

const IgnitionFormContainer = React.createClass({

    getInitialState: function(){
        return({
            data: null,
            showModal: false,
            showConfirmModal: false,
            projects: [],
            selectedParam: {param: "", value: ""}
        });
    },

    componentDidMount: function(){
        api.getIgnitionSettings(response => {
            this.setState({data: response.data});
        });

        this.getProjects();
    },

    getProjects: function(){
        let address = this.state.data ? this.state.data.address : "127.0.0.1:8088";

        axios.get("/api/ignition/projects/" + address).then(response => {
            this.setState({projects: response.data});
        });
    },

    onSubmit: function(event){
        event.preventDefault();
        this.toggleConfirmModal();
    },

    onSubmitImpl(event){
        event.preventDefault();
        api.postIgnitionSettings({data: this.state.data});
        this.toggleConfirmModal();
    },


    onChange: function(event){
        let _state = this.state;
        _state.data[event.target.id] = event.target.value;
        this.setState(_state);
    },

    toggleConfirmModal: function(){
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    },

    toggleModal: function(){
        this.setState({showModal: !this.state.showModal})
    },

    addParam: function(){
        this.setState({selectedParam: {param: "", value: ""}});
        this.toggleModal();
    },

    editParam: function(param){
        this.setState({selectedParam: {param: param, value: this.state.data.launch_params[param]}});
        this.toggleModal();
    },

    saveParam: function(values){
        let launch_params = this.state.data.launch_params;
        launch_params[values['param']] = values['value'];
        this.setState({launch_params: launch_params});
        this.toggleModal()
    },

    removeParam: function(param){
        let launch_params = this.state.data.launch_params;
        delete launch_params[param]
        this.setState({data: Object.assign({}, this.state.data, {launch_params: launch_params})});
    },

    render: function(){
        return(
            <div>
                <ConfirmModal
                    show={this.state.showConfirmModal}
                    onHide={this.toggleConfirmModal}
                    onYes={this.onSubmitImpl}
                />
                <IgnitionForm
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    projects={this.state.projects}
                    data={this.state.data}
                    selectedParam={this.state.selectedParam}
                    showParamForm={this.state.showModal}
                    onSubmitParam={this.saveParam}
                    onAddParam={this.addParam}
                    onEditParam={this.editParam}
                    onRemoveParam={this.removeParam}
                    onHideParamForm={this.toggleModal}
                />
            </div>
        );
    }
});

export default IgnitionFormContainer;
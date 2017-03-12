/**
 * Created by cwarren on 3/6/17.
 */
import React from 'react';
import IgnitionParamForm from '../views/ignition-param-form';

const IgnitionParamFormContainer = React.createClass({

    getInitialState: function(){
        return(Object.assign({}, this.props.data));
    },

    onSubmit: function(event){
        event.preventDefault();
        this.props.onSubmit(this.state);
    },

    onChange: function(event){
        let _state = this.state;
        _state[event.target.id] = event.target.value;
        this.setState(_state);
    },

    render: function(){
        return(
            <IgnitionParamForm
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                data={this.state}
            />
        );
    }
});

export default IgnitionParamFormContainer;
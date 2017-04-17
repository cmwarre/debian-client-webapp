/**
 * Created by cwarren on 3/12/17.
 */
import React from 'react';
import NTPAddressForm from '../views/ntp-address-form';

const NTPAddressFormContainer = React.createClass({

    getInitialState: function(){
        return({
            address: this.props.address,
            index: this.props.index
        });
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            address: nextProps.address,
            index: nextProps.index
        });
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
            <NTPAddressForm
                address={this.state.address}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
            />
        );
    }
});

export default NTPAddressFormContainer;
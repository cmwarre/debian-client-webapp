import React from 'react';
import LoginForm from '../views/login-form';
import * as api from '../../api/index';
import { withRouter } from 'react-router';

const LoginFormContainer = React.createClass({

    getInitialState: function(){
      return({
          username: "",
          password: ""
      });
    },

    onSubmit: function(event){
        event.preventDefault();
        api.login(this.state.username, this.state.password, response => {
            this.props.router.push("/");
        });
    },

    onChange: function(event){
        let _state = this.state;
        _state[event.target.id] = event.target.value;
        this.setState(_state);
    },

    render: function(){
        return(
            <LoginForm
                onSubmit={this.onSubmit}
                onChange={this.onChange}
            />
        );
    }
});

export default withRouter(LoginFormContainer);
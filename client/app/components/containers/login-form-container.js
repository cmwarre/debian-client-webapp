import React from 'react';
import LoginForm from '../views/login-form';

const LoginFormContainer = React.createClass({

    onSubmit: function(event){
        event.preventDefault();
        console.log(event.target);
    },

    render: function(){
        return(
            <LoginForm
                onSubmit={this.onSubmit}
            />
        );
    }
});

export default LoginFormContainer;
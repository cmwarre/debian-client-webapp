import React from 'react';
import { Button } from 'react-bootstrap';

const Home = React.createClass({
    render: function(){
        return(
            <div className="container">
                <h1>Home</h1>
                <p>
                    Welcome to Tamaki's Linux client setup application.
                    By navigating through the tabs above, you can change client settings for this computer.
                </p>
            </div>
        );
    }

});

export default Home;
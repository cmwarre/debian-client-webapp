import axios from 'axios';
import React from 'react';

const About = React.createClass({

    componentDidMount: function(){
        axios.get("api/").then(response => {
            console.log(response);
        });

        console.log("About");
        console.log("Rulz");
    },

    render: function(){
        return(
            <div className="container">
                <h1>About</h1>
            </div>
        );
    }

});

export default About;

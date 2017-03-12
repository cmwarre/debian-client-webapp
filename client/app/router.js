import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppLayout from './components/layouts/app-layout';

import Home from './components/pages/home';
import Login from './components/pages/login';

import NTPFormContainer from './components/containers/ntp-form-container';
import NetworkFormContainer from './components/containers/network-form-container';
import IgnitionFormContainer from './components/containers/ignition-form-container';

export default (
    <Router history={browserHistory}>
        <Route component={AppLayout}>
            <Route path="/" component={Home}/>
            <Route path="/network" component={NetworkFormContainer} />
            <Route path="/ntp" component={NTPFormContainer} />
            <Route path="/ignition" component={IgnitionFormContainer} />
            <Route path="/login" component={Login}/>
        </Route>
    </Router>
);

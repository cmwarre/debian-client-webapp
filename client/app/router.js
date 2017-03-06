import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import AppLayout from './components/layouts/app-layout';

import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Login from './components/pages/login';

export default (
    <Router history={browserHistory}>
        <Route component={AppLayout}>
            <Route path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/login" component={Login}/>
        </Route>
    </Router>
);

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import router from './router';
import { Provider } from 'react-redux';
import 'bootstrap/less/bootstrap.less';


ReactDOM.render(
<Provider store={store}>{router}</Provider>,
    document.getElementById('root')
);

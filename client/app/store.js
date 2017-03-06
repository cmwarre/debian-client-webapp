import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);//, persistedState);
export default store;


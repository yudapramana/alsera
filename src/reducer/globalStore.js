import rootReducer from './globalReducer'
import thunk from 'redux-thunk';

const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

// Store
const storeRedux = createStore(rootReducer, applyMiddleware(thunk));

export default storeRedux;
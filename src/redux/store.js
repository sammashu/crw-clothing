import { createStore , applyMiddleware} from 'redux';
import loffer, { logger } from 'redux-logger';


import rootReducer from './root-reducer';

const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;
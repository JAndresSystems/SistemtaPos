import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from './rootReduce';



// Estado inicial
const initialState = {
    root: {
        cartItems: localStorage.getItem('cartItems') 
            ? JSON.parse(localStorage.getItem('cartItems')) 
            : [],
    },
};

// Composición de middlewares y devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

// Creación del store
const store = createStore(
   
    combineReducers({ root: rootReducer }),
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;

import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator.js'
import reducer from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import firebase from './config/firebase'

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, composeEnhancers(middleware));
// console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SwitchNavigator />
            </Provider>
        );
    }
}

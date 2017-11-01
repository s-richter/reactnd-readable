import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import History from './components/History'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import appReducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
)

ReactDOM.render(
    <Provider store={store}>
        <Router history={History}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

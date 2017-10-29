import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import History from './components/History'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router history={History}>
        <App />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();

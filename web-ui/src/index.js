import React from 'react';
import { render } from 'react-dom';

import './index.css';
import { App } from './App/App';
import store from './_helpers/store'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import './App.scss';


ReactDOM.render(
    <Container style={{padding:0}} maxWidth="xl">
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Container>,
document.getElementById('root'));

serviceWorker.unregister();

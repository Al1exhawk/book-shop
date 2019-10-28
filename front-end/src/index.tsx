import React from 'react';
import ReactDOM from 'react-dom';
import { default as App} from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';



ReactDOM.render(     
    <Router>
        <App />
    </Router>,
document.getElementById('root'));


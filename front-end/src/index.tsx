import React from 'react';
import ReactDOM from 'react-dom';
import { default as App} from 'App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'App.scss';
import store from 'store'

ReactDOM.render(     
    <Router>
        <Provider store={store}> 
            <App />
        </Provider>
    </Router>,
document.getElementById('root'));


import React from 'react';
import LoginForm from '../containers/loginFormContainer'
import { Switch, Route } from "react-router-dom";

const Main: React.FC = () => {
    return (
        <div className ="container">
            <Switch>
                <Route exact path='/login' component = { LoginForm }/>
            </Switch>
        </div>
    )
}

export default Main;
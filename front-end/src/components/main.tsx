import React from 'react';
import LoginForm from '../containers/loginFormContainer'
import { Switch, Route } from "react-router-dom";

const Main: React.FC = () => {
    return (
        <Switch>
            <Route exact path='/login' component = { LoginForm }/>
        </Switch>
    )
}

export default Main;
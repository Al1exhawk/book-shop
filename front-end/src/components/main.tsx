import React from 'react';
import LoginForm from '../containers/loginForm/loginFormContainer'
import { Switch, Route } from "react-router-dom";
import ItemsContainer from '../containers/itemsContainer'

const Main: React.FC = () => {
    return (
        <div className ="container">
            <Switch>
                <Route exact path='/items' component = { ItemsContainer }/>
                <Route exact path='/login' component = { LoginForm }/>
            </Switch>
        </div>
    )
}

export default Main;
import React from 'react';
import LoginForm from '../containers/loginFormContainer'
import { Switch, Route } from "react-router-dom";
import ItemsContainer from '../containers/itemsContainer'

const Main: React.FC = () => {
    return (
        <div className ="container">
            <Switch>
                <Route exact path='/login' component = { LoginForm }/>
                <Route exact path='/items' component = { ItemsContainer }/>
            </Switch>
        </div>
    )
}

export default Main;
import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm } from './';
import { UserTable } from '../containers';


const Main: React.FC = () => {
    return (
        <Grid item container direction='column' >
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <Route exact path='/users' component={UserTable}/>                
                <Route exact path='/users/:id' component={EditUserForm}/>                
            </Switch>
        </Grid>
    )
}

export default Main;

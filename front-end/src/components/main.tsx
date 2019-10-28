import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop } from './';
import { UserTable } from '../containers';


const Main: React.FC = () => {
    return (
        <Grid item container direction='column' >
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <Route path='/users' component={UserTable}/>                
            </Switch>
        </Grid>
    )
}

export default Main;

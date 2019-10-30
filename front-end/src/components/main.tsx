import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm, PrivateRoute } from './';
import { UserTable } from '../containers';

interface OwnProps {
    role: string
}

type Props = OwnProps ;

const Main: React.FC<Props> = (props) => {
    return (
        <Grid item container direction='column' >
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <PrivateRoute exact path='/users' role={props.role} Comp={UserTable}/>
                <PrivateRoute exact path='/users/:id' role={props.role} Comp={EditUserForm}/>                
            </Switch>
        </Grid>
    )
}

export default Main;

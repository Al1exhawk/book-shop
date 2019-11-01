import React from 'react';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm, PrivateRoute } from './';
import { UserTable } from '../containers';
import AddUserForm from './add-user-form/add-user-form';

interface OwnProps {
    role: string
}

type Props = OwnProps ;

const Main: React.FC<Props> = (props) => {
    return (
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <PrivateRoute exact path='/users' role={props.role} Сomponent={UserTable}/>
                <PrivateRoute exact path='/user/add' role={props.role} Сomponent={ AddUserForm }/>                
                <PrivateRoute path='/users/:id' role={props.role} Сomponent={ EditUserForm }/>                
            </Switch>
        
    )
}

export default Main;

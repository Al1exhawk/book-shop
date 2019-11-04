import React from 'react';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm, PrivateRoute, AddAuthorForm, AddUserForm, EditAuthorForm} from './';
import { UserTable, AuthorTable } from '../containers';

interface OwnProps {
    role: string
}

type Props = OwnProps ;

const Main: React.FC<Props> = (props) => {
    return (
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <Route exact path='/authors' component={AuthorTable}/>
                <Route exact path='/authors/add' component={AddAuthorForm}/>
                <Route path='/authors/:id' component={EditAuthorForm}/>
                <PrivateRoute exact path='/users' role={props.role} Сomponent={UserTable}/>
                <PrivateRoute exact path='/user/add' role={props.role} Сomponent={ AddUserForm }/>                
                <PrivateRoute path='/users/:id' role={props.role} Сomponent={ EditUserForm }/>                
            </Switch>
        
    )
}

export default Main;

import React from 'react';
import { BrowserRouter as Switch, Route} from 'react-router-dom';
import { ItemShop, EditUserForm, PrivateRoute, AddAuthorForm, AddUserForm, EditAuthorForm, AddItemForm} from './';
import { UserTable, AuthorTable, ItemTable } from '../containers';

interface OwnProps {
    role: string
}

type Props = OwnProps ;

const Main: React.FC<Props> = (props) => {
    return (
            <Switch>
                <Route exact path='/' component={ItemShop}/>
                <PrivateRoute exact path='/authors' role={props.role} Сomponent={AuthorTable}/>
                <PrivateRoute exact path='/authors/add' role={props.role} Сomponent={AddAuthorForm}/>
                <PrivateRoute path='/authors/edit/:id' role={props.role} Сomponent={EditAuthorForm}/>
                <PrivateRoute exact path='/users' role={props.role} Сomponent={ UserTable }/>
                <PrivateRoute path='/users/edit/:id' role={props.role} Сomponent={ EditUserForm }/>                
                <PrivateRoute exact path='/users/add' role={props.role} Сomponent={ AddUserForm }/>                
                <PrivateRoute exact path='/items' role={props.role} Сomponent={ ItemTable }/>
                <PrivateRoute exact path='/items/add' role={props.role} Сomponent={ AddItemForm }/>
            </Switch>
        
    )
}

export default Main;

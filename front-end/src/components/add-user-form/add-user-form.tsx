import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField, Button, Grid} from '@material-ui/core';
import {CreateUserModel } from '../../models';
import { userService } from '../../services';


type Props = RouteComponentProps;

const AddUserForm: React.FC<Props> = (props) => {
    
    const [user, setUser] = React.useState<CreateUserModel>({
        userName: '',
        password: '',
        email: '',
    });

    
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        userService.createUser(user);
    }

    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name} = e.target;
        if(name!=='passwordConfirm') {
            setUser({...user,
              [name]: value 
            });
        }
    }

    return (
        <form onSubmit={onSubmit} className='editForm'>  
            <Grid container direction='column'>       
                    <TextField
                        onChange={onChange}
                        name='userName'
                        label='UserName'
                        />

                    <TextField
                        onChange={onChange}
                        name='password'                        
                        label='Password'

                    />
                    <TextField
                        onChange={onChange}
                        name='passwordConfirm'                        
                        label='Confirm password'
                    />

                    <TextField
                        onChange={onChange}
                        name='email'
                        label='Email'
                    />

                    <Button type='submit' variant='contained'>Add</Button>
            </Grid>  
        </form>
    )
}

export default AddUserForm;
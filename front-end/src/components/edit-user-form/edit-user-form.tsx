import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import { TextField, Button, Grid } from '@material-ui/core';
import './styles.scss';
import { UpdateUserModel } from 'models';
import { userService } from 'services';

type TParams = { id: string };
type Props = RouteComponentProps<TParams>;

const EditUserForm: React.FC<Props> = ({ match }) => {

    const [user, setUser] = React.useState<UpdateUserModel>({ userName: '', password: '', email: '' });

    const fetchUser = async () => {
        const userE = await userService.getUser(match.params.id);
        const { userName, password, email } = userE;

        setUser({ ...user, userName, password, email });
    }

    React.useEffect(() => {
        fetchUser();
    }, []);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userService.updateUser(match.params.id, user);
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (name !== 'passwordConfirm') {
            setUser({
                ...user, [name]: value
            });
        }
    }
    return (
        <form onSubmit={onSubmit} className='editForm'>
            <Grid container direction='column'>
                <TextField
                    onChange={onChange}
                    name='userName'
                    value={user.userName}
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
                    value={user.email}
                    label='Email'
                />
                <Button type='submit' variant='contained'>Edit</Button>
            </Grid>
        </form>
    )
}

export default EditUserForm;

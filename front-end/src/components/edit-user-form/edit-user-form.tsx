import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField} from '@material-ui/core';
import './styles.scss';
import { UpdateUserModel } from '../../models';
import { userService } from '../../services/user.service';

type TParams = { id: string };
type Props = RouteComponentProps<TParams>;

const EditUserForm: React.FC<Props> = ({match}) => {
    
    const [user, setUser] = React.useState<UpdateUserModel>({userName:'', password: '', confirmPassword: false, role:'', email: ''});

    const fetchUser = async () => {
        const userE = await userService.getUser(match.params.id);
        const {userName, password, confirmPassword,role, email } = userE;
        setUser({...user,userName, password, confirmPassword, role, email});
        console.log('user', userE);
        console.log('user', user);

    }

    React.useEffect(() => {
        fetchUser();
    }, []);
    const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
    }
    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name} = e.target;
        console.log(`${name}`, value);
;
    }
    return (
        <div className='editForm'>
            <form onSubmit={onSubmit}>
                    <TextField
                        onChange={onChange}
                        name='userName'
                        id='userName'
                        defaultValue='123'
                        label='UserName'
                        />

                    <TextField/>

                    <TextField/>


                    <TextField/>


            </form>
        </div>
    )
}

export default EditUserForm;

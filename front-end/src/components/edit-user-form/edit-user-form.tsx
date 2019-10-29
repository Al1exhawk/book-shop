import React, { FormEvent, ChangeEvent } from 'react'
import { RouteProps } from 'react-router'
import {TextField,  FormControl} from '@material-ui/core';

type Props = RouteProps;

const EditUserForm: React.FC<Props> = (props) => {

    React.useEffect(() => {
        
    }, []);
    const onSubmit = (e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
    }
    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const e1 = e.target;
        console.log('e1', e1)
    }
    return (
        <form onSubmit={onSubmit} autoComplete='off'>
            <div>
                <FormControl>
                    <TextField
                        onChange={onChange}/>


                    <TextField
                    
                    ></TextField>


                    <TextField
                    
                    ></TextField>


                    <TextField
                    
                    ></TextField>


                </FormControl>         
            </div>
        </form>
    )
}

export default EditUserForm;

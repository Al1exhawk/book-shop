import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField, Button, Grid} from '@material-ui/core';
import {CreateAuthorModel } from 'models';
import { authorService } from 'services';


type Props = RouteComponentProps;

const AddAuthorForm: React.FC<Props> = (props) => {
    
    const [author, setAuthor] = React.useState<CreateAuthorModel>({
        firstName: '',
        lastName: '',
        items: []
    });

    
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        authorService.createAuthor(author)
        props.history.goBack();
    }

    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name} = e.target;
        setAuthor({...author,
            [name]: value 
        });
    }

    return (
        <form onSubmit={onSubmit} className='editForm'>  
            <Grid container direction='column'>       
                    <TextField
                        onChange={onChange}
                        name='firstName'
                        label='First name'
                    />

                    <TextField
                        onChange={onChange}
                        name='lastName'                        
                        label='Last name'
                    />

                    <Button type='submit' variant='contained'>Add</Button>
            </Grid>  
        </form>
    )
}

export default AddAuthorForm;
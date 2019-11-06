import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField, Button, Grid} from '@material-ui/core';
import { UpdateAuthorModel } from '../../models';
import { authorService } from '../../services';

type TParams = { id: string };
type Props = RouteComponentProps<TParams>;

const EditAuthorForm: React.FC<Props> = ({match}) => {
    
    const [author, setAuthor] = React.useState<UpdateAuthorModel>({
        firstName: '',
        lastName: '',
        items: []
    });

    const fetchAuthor = async () => {
        const authorE = await authorService.getAuthor(match.params.id);
        const {firstName, lastName, items } = authorE;
        
        setAuthor({...author, firstName, lastName, items});
    }

    React.useEffect(() => {
        fetchAuthor();
    }, []);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        authorService.updateAuthor(match.params.id,author);
    }

    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name} = e.target;
            setAuthor({
                ...author,  [name]: value 
            });
       
    }
    return (
        <form onSubmit={onSubmit} className='editForm'>  
            <Grid container direction='column'>       
                    <TextField
                        onChange={onChange}
                        name='firstName'
                        label='First name'
                        value={author.firstName}
                    />

                    <TextField
                        onChange={onChange}
                        name='lastName'                        
                        label='Last name'
                        value={author.lastName}
                    />
                    <Button type='submit' variant='contained'>Edit</Button>
            </Grid>  
        </form>
    )
}

export default EditAuthorForm;
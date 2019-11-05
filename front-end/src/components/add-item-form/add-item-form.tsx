import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField, Button, FormGroup, RadioGroup, Radio, FormControlLabel, Select, MenuItem} from '@material-ui/core';
import {CreateItemModel, AuthorModel } from '../../models';
import { itemService, authorService } from '../../services';


type Props = RouteComponentProps;


const AddItemForm: React.FC<Props> = (props) => {
    
    const [item, setItem] = React.useState<CreateItemModel>({
        title: '',
        authors: [],
        type: 'book',
        price: 0,
    });

    const [authorS, setAuthors] = React.useState<AuthorModel[]>([]);


    const fetchAuthors = async () => {
        const authorsP = await authorService.getAuthors({page:1, contentPerPage:10});
        const authors = authorsP.content;
        setAuthors(authors);
    }

    React.useEffect(()=>{
        fetchAuthors();
    },[])
    
    const onSubmit = (e: FormEvent<HTMLFormElement>) => { 

        e.preventDefault();
        itemService.createItem(item)
        props.history.goBack();
    }

    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name, type} = e.target as HTMLInputElement;
        setItem({...item,
            [name]: type === 'number'? +value:value 
        });
    }

    const onSelect =(e:ChangeEvent<{ value: unknown }>)=>{
        const { name } = e.target as HTMLSelectElement;
        setItem({...item, [name]: e.target.value as string[]  })
    }
    

    return (
        <form onSubmit={onSubmit} className='editForm'>  
            <FormGroup>       
                    <TextField
                        onChange={onChange}
                        name='title'
                        label='Title'
                    />
                    <TextField
                        onChange={onChange}
                        name='price'
                        label='Price'
                        type='number'
                    />
                    <RadioGroup name='type' value={item.type} onChange={onChange}>
                        <FormControlLabel value="book" control={<Radio />} label="book" />
                        <FormControlLabel value="magazine" control={<Radio />} label="magazine" />
                    </RadioGroup>

                    <Select
                        multiple
                        onChange={onSelect}
                        value={item.authors}
                        name='authors'
                    >
                        {authorS.map((author:AuthorModel)=>{
                            return <MenuItem key={author.id} value={author.id}>{author.firstName}</MenuItem>
                        })}
                    </Select>

                    <Button type='submit' color='primary' variant='contained'>Add</Button>
            </FormGroup>  
        </form>
    )
}

export default AddItemForm;
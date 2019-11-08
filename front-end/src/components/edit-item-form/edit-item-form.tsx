import React, { FormEvent, ChangeEvent } from 'react'
import { RouteComponentProps } from 'react-router';
import {TextField, Button, FormGroup, RadioGroup, FormControlLabel, Radio, Select, MenuItem} from '@material-ui/core';
import { UpdateItemModel, AuthorModel } from 'models';
import { itemService, authorService } from 'services';


type TParams = { id: string };
type Props = RouteComponentProps<TParams>;

const EditItemForm: React.FC<Props> = ({match}) => {
    
    const [item, setItem] = React.useState<UpdateItemModel>({
        title: '',
        type: '',
        authors: [],
        price: 0
    });

    const [authorS, setAuthors] = React.useState<AuthorModel[]>([]);


    

    const fetchItem = async () => {
        const itemE = await itemService.getItem(match.params.id);
        const {title,type,authors,price } = itemE;
        const authorsId: string[] = authors.map(author=> author._id);
        setItem({...item, title, type, authors: authorsId,price});

        const authorsP = await authorService.getAuthors({page:1, contentPerPage:10});
        const authorS = authorsP.content;
        setAuthors(authorS);
    }

    React.useEffect(() => {
        fetchItem();
    }, []);
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();
        itemService.updateItem(match.params.id,item);
    }

    const onChange=(e:ChangeEvent<HTMLInputElement>)=> {
        const {value, name} = e.target;
        setItem({
                ...item, [name]: value 
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
                        value={item.title}
                    />

                    <TextField
                        onChange={onChange}
                        name='price'                        
                        label='Price'
                        value={item.price}
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

                    <Button type='submit' variant='contained'>Edit</Button>
            </FormGroup>  
        </form>
    )
}

export default EditItemForm;
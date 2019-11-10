import React, { useState, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { FilterForm } from '../../models/types';
import { updateFilter } from '../../store'
import { Select, MenuItem, InputLabel, Input, Button, Grid } from '@material-ui/core';
import './itemFilter.scss'

interface PropsFromDispatch {
    update: typeof updateFilter
}

type Props = PropsFromDispatch;

const ItemFilter: React.FC<Props> = (props) => {
    const [itemFilterState, hanldeChange] = useState<FilterForm>(
        {
            minPrice: 0,
            maxPrice: 0,
            itemType: ['book', 'magazine'],
            authorSearchString: '',
            titleSearchString: ''
        });

    const hanleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        hanldeChange({ ...itemFilterState, [name]: type === 'number' ? +value : value });
    }

    const [selectValue, Change] = useState<string>('All');

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        Change(value as string);
        hanldeChange({ ...itemFilterState, [name as string]: value === 'All' ? ['book', 'magazine'] : [value] });

    };

    const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.update(itemFilterState);
    }

    return (
        <Grid item container justify='center'>
            <form className='ItemFilter' onSubmit={onFilterSubmit} >
                <Grid container direction='row' justify='center' alignItems='center' spacing={2}>
                    <Grid item>
                        <InputLabel htmlFor='select'>Type</InputLabel>
                        <Select value={selectValue} name='itemType' onChange={handleSelectChange} id='select' autoWidth={true}>
                            <MenuItem selected value='All'>All</MenuItem>
                            <MenuItem value='magazine'>Magazine</MenuItem>
                            <MenuItem value='book'>Book</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item>
                        <InputLabel htmlFor='min'>Min Price</InputLabel>
                        <Input onChange={hanleInputChange} id='min' name='minPrice' type='number' />
                    </Grid>

                    <Grid item>
                        <InputLabel htmlFor='max'>Max Price</InputLabel>
                        <Input onChange={hanleInputChange} id='max' name='maxPrice' type='number' />
                    </Grid>

                    <Grid item>
                        <InputLabel htmlFor='Title'>by Title</InputLabel>
                        <Input onChange={hanleInputChange} id='Title' name='titleSearchString' type='text' />
                    </Grid>

                    <Grid item>
                        <InputLabel htmlFor='Author'>by Author</InputLabel>
                        <Input onChange={hanleInputChange} id='Author' name='authorSearchString' type='text' />
                    </Grid>

                    <Grid item container justify='center' alignItems='center' >
                        <Button
                            color='primary'
                            className='SearchButton'
                            type='submit'
                            variant='contained'
                        >Search
                            </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

const mapDispathToProps = {
    update: updateFilter
}

export default connect(null, mapDispathToProps)(ItemFilter);

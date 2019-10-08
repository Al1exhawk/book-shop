import React, {useState, FormEvent, ChangeEvent} from 'react';
import { connect } from 'react-redux';
import { FilterForm } from '../../constants/types';
import { updateFilter } from '../../store'
import { Select, MenuItem, InputLabel, Input , Button } from '@material-ui/core';
import './itemFilter.scss'

interface Props {
    update: Function
}
  const ItemFilter: React.FC<Props> = (props) => {
        const [itemFilterState, hanldeChange] = useState<FilterForm>(
            {minPrice: 0,
             maxPrice: 0,
             itemType: ['book', 'magazine'],
             authorSearchString: '',
             titleSearchString: '' 
            })
            
        const hanleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
                const {name, value, type} = e.target;
                
                hanldeChange({...itemFilterState, [name]: type === 'number'? +value: value});    
        }
            
        const [ selectValue, Change] = useState('All');
       
        const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
           
            const {name, value} = event.target;
            Change(value as string);
            hanldeChange({...itemFilterState, [name as string]: value === 'All'? ['book', 'magazine']: [value] });    
           
          };

        const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.update(itemFilterState);
        }

      

         

        return (          
            
                <form className='ItemFilter' onSubmit = {onFilterSubmit} >          
                    <InputLabel className='headerText' htmlFor="select">Type</InputLabel>
                    <Select  value={selectValue} name='itemType' onChange={handleSelectChange} id='select' autoWidth={true}>
                        <MenuItem selected value='All'>All</MenuItem>
                        <MenuItem value='magazine'>Magazine</MenuItem>
                        <MenuItem value='book'>Book</MenuItem>
                    </Select>
                    <Input  onChange={hanleInputChange} name = 'minPrice' type = 'number' placeholder='Min $'/>
                    <Input  onChange={hanleInputChange} name = 'maxPrice' type = 'number' placeholder='Max $'/>
                    <Input  onChange={hanleInputChange} name = 'titleSearchString' type = 'text' placeholder = 'Title'/>
                    <Input  onChange={hanleInputChange} name = 'authorSearchString' type = 'text' placeholder = 'Author'/>
                    <Button 
                     type='submit'
                     variant="contained"
                     color="primary">Search
                     </Button>
                </form>
            
      )
  }
  
const mapDispathToProps = {
    update: updateFilter
 }

  export default connect(null, mapDispathToProps)(ItemFilter);
  
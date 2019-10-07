import React, {useState, FormEvent, ChangeEvent} from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {FilterForm} from '../constants/types';
import {updateFilter} from '../store'

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

        const handleSelectChange = (selectedOption: any) => {
            hanldeChange({...itemFilterState, 'itemType': selectedOption.value});
           
        }

        const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.update(itemFilterState);
        }

        const customStyles = {
            option: (provided: any, state: any) => ({
              ...provided,             
              color: state.isSelected ? 'red' : '#007bff',
              padding: '0.5rem',
              margin: 0,
              width: '100%'
            })
        }

         const options = [
         { value: ['book', 'magazine'], label: 'All' },
         { value: ['book'], label: 'Book' },
         { value: ['magazine'], label: 'Magazine' }];

        return (          
            <form onSubmit = {onFilterSubmit} className = 'filterForm form-group'>
                <input  onChange={hanleInputChange} className='form-control' name = 'minPrice' type = 'number' placeholder='Min $'/>
                <input  onChange={hanleInputChange} className='form-control' name = 'maxPrice' type = 'number' placeholder='Max $'/>
                <Select styles={customStyles} className='filterFormField' placeholder = 'All' options = {options} onChange = {handleSelectChange}/>
                <input  onChange={hanleInputChange} className='form-control' name = 'titleSearchString' type = 'text' placeholder = 'Title'/>
                <input  onChange={hanleInputChange} className='form-control' name = 'authorSearchString' type = 'text' placeholder = 'Author'/>
                <button className="btn btn-primary center">Search</button>
            </form>
      )
  }
  
const mapDispathToProps = {
    update: updateFilter
 }

  export default connect(null, mapDispathToProps)(ItemFilter);
  
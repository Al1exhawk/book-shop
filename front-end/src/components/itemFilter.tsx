import React, {useState, FormEvent, ChangeEvent} from 'react';




  const ItemFilter: React.FC = props => {
        const [itemFilterState, hanldeChange] = useState({})

        const hanleInputChange = (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
            const {name, value} = e.target;
        
            hanldeChange({...itemFilterState, [name]: value});    
        }

        const onFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
         }

      return (          
            <form onSubmit = {onFilterSubmit} className = 'form-group loginForm'>
                <input  onChange={hanleInputChange} name = 'minPrice' type = 'number' placeholder='Min $'/>
                <input  onChange={hanleInputChange} name = 'maxPrice' type = 'number' placeholder='Max $'/>
                <select onChange={ hanleInputChange } name = 'itemType'>
                    <option  value = 'All' >All</option>
                    <option  value = {['book']}>Book</option>
                    <option  value = {['magazine']}>Magazine</option>
                </select>
                <input  onChange={hanleInputChange} name = 'titleSearchString' type = 'text' placeholder = 'Title'/>
                <input  onChange={hanleInputChange} name = 'authorSearchString' type = 'text' placeholder = 'Author'/>
                <button className="btn btn-primary">Search</button>
            </form>
      )
  }
  
  export default ItemFilter;
  
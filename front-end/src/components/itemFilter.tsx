import React from 'react';


  const ItemFilter: React.FC = props => {



      return (          
            <form className = 'form-group'>
                <input name = 'minPrice' type = 'number' placeholder='Min $'/>
                <input name = 'maxPrice' type = 'number' placeholder='Max $'/>
                <select name = 'itemType'>
                    <option value = {['book', 'magazine']}>All</option>
                    <option value = {['book']}>Book</option>
                    <option value = {['magazine']}>Magazine</option>
                </select>
                <input name = 'titleSearchString' type = 'text' placeholder = 'Title'/>
                <input name = 'authorSearchString' type = 'text' placeholder = 'Author'/>
                <button className="btn btn-primary">Search</button>
            </form>
      )
  }
  
  export default ItemFilter;
  
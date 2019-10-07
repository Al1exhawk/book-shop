import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { IRoutProps } from '../constants/types';
import { connect } from 'react-redux';
import { GenericState } from '../store'

interface Props extends IRoutProps{  
    readonly itemFilter: any
  }


const ItemsContainer: React.FC<Props> = (props) => {
    const [items, setItems] = useState([]);
    const [pages, setPages] = useState(1);

    const fetchItems = async () =>{
       const serverResponse = await axios.post("http://localhost:80/items", props.itemFilter, { responseType: "json" });
       const pagingModel = serverResponse.data;
       setItems(pagingModel.content);
       setPages(pagingModel.pages);
      
    }

    useEffect(() => {
        fetchItems();
        }, []);

    useEffect(() => {
        fetchItems();
        }, [props.itemFilter]);

    return(
        <div>

        </div>
    )
}

const mapStateToProps = (state: GenericState) => ({
    itemFilter: state.itemFilter
})

export default connect(mapStateToProps, null)(ItemsContainer);

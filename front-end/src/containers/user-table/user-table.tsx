import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { GenericState } from '../../store';
import { PagingModel, UserModel } from '../../../../back-end/src/models';
import { userService } from '../../services/user.service';



const UserTable: React.FC = ()=> {
    const [users, setUsers] = useState<UserModel[]>([]);
    const [pages, setPages] = useState([1]);

   const fetchUses = async () => {
    const p: PagingModel = {page: 1, contentPerPage: 10};
    const pagingModel  = await userService.getUsers(p);
    const itemsArr: UserModel[] = pagingModel.content;
    const pagesNumber: number = pagingModel.pages;

    setUsers(itemsArr);
     const pageButtonsArr: number[] = [] 
       for(let i: number = 0; i<pagesNumber; i++) {
            pageButtonsArr.push(i+1)
       }
    setPages(pageButtonsArr)
   }   

    useEffect(()=>{
        fetchUses();
    },[]);

    return (
        <div>
            <p>hello</p>            
        </div>
    )
}

const mapStateToProps = (state: GenericState) => ({
    userFilter: state.itemFilter
});

export default connect(mapStateToProps)(UserTable);
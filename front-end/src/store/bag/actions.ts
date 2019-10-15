import { ItemModel } from "../../../../back-end/src/models";
import { Dispatch } from "redux";
import { ActionTemplate } from "../../constants/types";

export const ADD_ITEM_TO_BAG = 'ADD_ITEM_TO_BAG';
export const REMOVE_ITEM_FROM_BAG = 'ADD_ITEM_TO_BAG';
export const CLOSE_BAG_MODAL = 'CLOSE_BAG_MODAL';
export const OPEN_BAG_MODAL = 'OPEN_BAG_MODAL';

export const addItemToBag = (item: ItemModel) => (dispatch:Dispatch<ActionTemplate>) => {
    return dispatch({
        type: ADD_ITEM_TO_BAG,
        payload: item
    })
}

export const removeItemFromBag = (id: string) => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: REMOVE_ITEM_FROM_BAG,
        payload: id
    })
}

export const openBagModal = () => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: OPEN_BAG_MODAL
    })

}
export const closeBagModal = () => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: CLOSE_BAG_MODAL
    })
}
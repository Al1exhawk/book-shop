export const ADD_ITEM_TO_BAG = 'ADD_ITEM_TO_BAG';
export const REMOVE_ITEM_FROM_BAG = 'REMOVE_ITEM_FROM_BAG';
export const CLOSE_BAG_MODAL = 'CLOSE_BAG_MODAL';
export const OPEN_BAG_MODAL = 'OPEN_BAG_MODAL';


export const addItemToBag = (id: string) => {
    return {
        type: ADD_ITEM_TO_BAG,
        payload: id
    }
}

export const removeItemFromBag = (id: string) => { 
    return {
        type: REMOVE_ITEM_FROM_BAG,
        payload: id
    }
}

export const openBagModal = () => {
    return {
        type: OPEN_BAG_MODAL
    }

}

export const closeBagModal = () => {
    return {
        type: CLOSE_BAG_MODAL
    }
}


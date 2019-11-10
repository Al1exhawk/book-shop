import { FilterForm } from '../../models/types';

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const SET_NEW_PAGE = 'SET_NEW_PAGE';

export const updateFilter = (newFilterState: FilterForm) => {
  return {
    type: UPDATE_FILTER,
    payload: newFilterState,
  };
};

export const setNewPage = (newPage: number = 1) => {
  return {
    type: SET_NEW_PAGE,
    payload: newPage,
  };
};

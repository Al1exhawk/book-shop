export const SET_NEW_AUTHOR_PAGE = 'SET_NEW_AUTHOR_PAGE';
export const SET_AUTHOR_PER_PAGE = 'SET_AUTHOR_PER_PAGE';

export const setNewAuthorPage = (newPage: number = 1) => {
    return{
        type:  SET_NEW_AUTHOR_PAGE,
        payload: newPage
    };
}
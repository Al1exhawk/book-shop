import { ItemModel, UserModel, AuthorModel } from '../';

export interface FilterModel<T = ItemModel[]|UserModel[]|AuthorModel[]> {
    readonly pages: number;
    readonly content: T[];
}

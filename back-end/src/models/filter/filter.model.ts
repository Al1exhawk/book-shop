import { ItemModel, UserModel, AuthorModel } from '../';

export interface FilterModel {
    readonly pages: number;
    readonly content: ItemModel[]|UserModel[]|AuthorModel[];
}

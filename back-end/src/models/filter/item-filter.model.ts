import { ItemModel } from 'src/models';

export interface ItemFilterModel {
    readonly pages: number;
    readonly items: ItemModel[];
}

import { Item } from 'src/models/item/item.model';

export interface ItemFilterModel {
    readonly pages: number;
    readonly items: Item[];
}

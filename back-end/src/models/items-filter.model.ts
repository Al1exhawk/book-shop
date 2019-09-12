import {Item} from 'src/models/item.model';

export interface ItemFilterModel {
    readonly pages: number;
    readonly items: Item[];
}

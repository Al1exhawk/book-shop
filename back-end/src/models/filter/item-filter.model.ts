import { Item } from 'src/models';
import { ItemDocument } from 'src/documents';

export interface ItemFilterModel {
    readonly pages: number;
    readonly items: Item[]|ItemDocument[];
}

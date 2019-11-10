import { ItemModel } from '..';

export interface BagItemModel {
  readonly item: ItemModel;
  readonly amount: number;
}

import { BagItemModel } from './bagItem.model';

export interface BagModel {
  readonly items: BagItemModel[];
  readonly totalPrice: number;
  readonly totalAmount: number;
}

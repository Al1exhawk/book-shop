import { BagItemModel } from './bagItem.model';

export interface BagModel {
  items: BagItemModel[];
  totalPrice: number;
  totalAmount: number;
}

import { model, Schema, Document } from 'mongoose';

export interface ItemDocument extends Document {
    readonly  id: string;
    readonly  title: string;
    readonly  authors: object[];
    readonly  type: string;
    readonly  price: number;
}

export const ItemSchema = new Schema({
  title: String,
  authors: [{
      type: Schema.Types.ObjectId,
      ref: 'Author',
    }],
  type: String,
  price: Number,
});

export default model<ItemDocument>('Item', ItemSchema);

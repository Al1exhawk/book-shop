import { Schema } from 'mongoose';

export const ItemSchema = new Schema({
  title: String,
  authors: [{
      type: Schema.Types.ObjectId,
      ref: 'Author',
    }],
  type: String,
  price: Number,
});

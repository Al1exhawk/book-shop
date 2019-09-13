import { ObjectId, Schema } from 'mongoose';

export const ItemSchema = new Schema({
  title: String,
  authors: [{
      type: ObjectId,
      ref: 'Author',
    }],
  type: String,
  price: Number,
});

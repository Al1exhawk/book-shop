import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  title: String,
  authors: [Object],
  type: String,
  price: Number,
});

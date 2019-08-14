import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  title: String,
  authors: [String],
  type: String,
  price: Number,
});

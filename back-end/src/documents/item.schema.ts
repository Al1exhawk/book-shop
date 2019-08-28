import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  title: String,
  authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'authors'}],
  type: String,
  price: Number,
});

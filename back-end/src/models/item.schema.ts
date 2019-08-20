import * as mongoose from 'mongoose';
import {author} from './author.interface'

export const ItemSchema = new mongoose.Schema({
  title: String,
  authors: [Object],
  type: String,
  price: Number,
});

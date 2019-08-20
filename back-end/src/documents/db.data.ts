import { Document } from 'mongoose';
import {author} from '../models/author.interface'

export interface ItemDoc extends Document {
  readonly  id?: String;
  readonly  title: String;
  readonly  authors?: author[];
  readonly  price?: Number;    
}
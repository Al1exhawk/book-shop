import { Document } from 'mongoose';
import {Author} from 'src/models/author.interface'

export interface ItemDoc extends Document {
  readonly  id?: String;
  readonly  title: String;
  readonly  authors: Author[];
  readonly  type: String;
  readonly  price: Number;    
}

export interface UserDoc extends Document {
  readonly  id?: String;
  readonly  userName: String;
  readonly  type: String;
  readonly  password: String;  
  readonly  confirmPassword?: Boolean;   
}
import { Document } from 'mongoose';
import {Author} from 'src/models/author.model'

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

export interface AuthorDoc extends Document {
  readonly firstName: String;
  readonly lastName: String;
}
import { Document} from 'mongoose';
import {Author} from 'src/models/author.model';

export interface ItemDocument extends Document {
  readonly  id?: string;
  readonly  title: string;
  readonly  authors: Author[];
  readonly  type: string;
  readonly  price: number;
}

export interface UserDocument extends Document {
  readonly  id?: string;
  readonly  userName: string;
  readonly  type: string;
  readonly  password: string;
  readonly  confirmPassword?: boolean;
}

export interface AuthorDocument extends Document {
  readonly id?: string;
  readonly firstName: string;
  readonly lastName: string;
}

import { Document} from 'mongoose';

export interface ItemDocument extends Document {
  readonly  id: string;
  readonly  title: string;
  readonly  authors: any[];
  readonly  type: string;
  readonly  price: number;
}

export interface UserDocument extends Document {
  readonly  id: string;
  readonly  userName: string;
  readonly  role: string;
  readonly  password: string;
  readonly  confirmPassword?: boolean;
  readonly  email: string;
}

export interface AuthorDocument extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly items: any[];
}

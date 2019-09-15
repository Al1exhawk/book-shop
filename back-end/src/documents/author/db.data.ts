import { Document} from 'mongoose';

export interface AuthorDocument extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly items: any[];
}

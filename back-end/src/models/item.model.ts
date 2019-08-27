import {Author} from './author.model';

export interface Item {
  id?: string;
  title: string;
  authors: Author[];
  type: string;
  price: number;
}

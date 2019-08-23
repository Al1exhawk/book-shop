import {Author} from './author.interface'

export interface Item {
  id?: String;
  title: String;
  authors: Author[];
  type: String;
  price: Number;
}

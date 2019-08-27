import {Author} from './author.model'

export interface Item {
  id?: String;
  title: String;
  authors: Author[];
  type: String;
  price: Number;
}

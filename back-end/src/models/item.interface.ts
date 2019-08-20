import {author} from './author.interface'

export interface Item {
  id?: String;
  title: String;
  authors: author[];
  type: String;
  price: Number;
}

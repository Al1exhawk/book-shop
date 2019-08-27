import {Author} from './author.model';

export interface CreateItem {
  readonly title: String;
  readonly authors: Author[];
  readonly type: String;
  readonly price: Number;
}

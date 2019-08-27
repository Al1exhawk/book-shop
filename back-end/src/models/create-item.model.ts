import {Author} from './author.model';

export interface CreateItem {
  readonly title: string;
  readonly authors: Author[];
  readonly type: string;
  readonly price: number;
}

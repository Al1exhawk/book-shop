import {Author} from './author.model';

export interface Item {
  readonly id?: string;
  readonly title: string;
  readonly authors: Author[];
  readonly type: string;
  readonly price: number;
}

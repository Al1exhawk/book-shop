import {Author} from './author.interface'

export interface CreateItemdto {
  readonly title: String;
  readonly authors: Author[];
  readonly type: String;
  readonly price: Number;
}

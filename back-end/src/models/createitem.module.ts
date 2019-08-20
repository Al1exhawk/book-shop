import {author} from './author.interface'
export interface CreateItemdto {
  readonly title: String;
  readonly authors: author[];
  readonly type: String;
  readonly price: Number;
}

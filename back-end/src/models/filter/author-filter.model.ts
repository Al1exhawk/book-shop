import { AuthorModel } from 'src/models';

export interface AuthorFilterModel {
    readonly pages: number;
    readonly items: AuthorModel[];
}

import { UserModel } from 'src/models';

export interface UserFilterModel {
    readonly pages: number;
    readonly items: UserModel[];
}

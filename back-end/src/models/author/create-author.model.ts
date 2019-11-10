import { Types } from 'mongoose';

export interface CreateAuthorModel {
  readonly firstName: string;
  readonly lastName: string;
  readonly items: [Types.ObjectId];
}

import * as mongoose from 'mongoose';

export interface CreateAuthor {
    readonly firstName: string;
    readonly lastName: string;
    readonly items: [mongoose.Schema.Types.ObjectId];
  }

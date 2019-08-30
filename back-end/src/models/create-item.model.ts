import * as mongoose from 'mongoose';

export interface CreateItem {
    readonly title: string;
    readonly authors: [mongoose.Schema.Types.ObjectId];
    readonly type: string;
    readonly price: number;
  }

import { Schema } from 'mongoose';

export const AuthorSchema = new Schema({
     firstName: String,
     lastName: String,
     items: [{
          type: Schema.Types.ObjectId,
          ref: 'Item',
     }],
});

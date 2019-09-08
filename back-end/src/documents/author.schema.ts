import {ObjectId, Schema} from 'mongoose';

export const AuthorSchema = new Schema({
     firstName: String,
     lastName: String,
     items: [{
          type: ObjectId,
          ref: 'Item',
     }],
});

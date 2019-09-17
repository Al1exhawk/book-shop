import { model, Schema, Document } from 'mongoose';

export interface AuthorDocument extends Document {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly items: any[];
}

export const AuthorSchema = new Schema({
     firstName: String,
     lastName: String,
     items: [{
          type: Schema.Types.ObjectId,
          ref: 'Item',
     }],
});

export default model<AuthorDocument>('Author', AuthorSchema);

import { Document, model, Schema } from 'mongoose';

export interface UserDocument extends Document {
  readonly id: string;
  readonly userName: string;
  readonly role: string;
  readonly password: string;
  readonly confirmPassword: boolean;
  readonly email: string;
}

export const UserSchema = new Schema({
  userName: String,
  role: {
    type: String,
    default: 'user',
  },
  password: String,
  confirmPassword: {
    type: Boolean,
    default: false,
  },
  email: String,
});

export default model<UserDocument>('User', UserSchema);

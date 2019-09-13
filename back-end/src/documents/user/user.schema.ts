import { Schema } from 'mongoose';

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

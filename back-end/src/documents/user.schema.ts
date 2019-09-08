import {Schema} from 'mongoose';

export const UserSchema = new Schema({
     userName: String,
     role: String,
     password: String,
     confirmPassword: {
          type: Boolean,
          default: false,
     },
     email: String,
});

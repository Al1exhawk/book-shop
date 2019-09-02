import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
     userName: String,
     role: String,
     password: String,
     confirmPassword: {
          type: Boolean,
          default: false,
     },
     email: String,
});

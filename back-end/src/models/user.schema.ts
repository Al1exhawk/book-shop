import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
     userName: String,
     type: String,
     password: String,
     confirmPassword: Boolean,  
});

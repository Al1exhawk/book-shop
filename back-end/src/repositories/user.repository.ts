import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserDocument } from 'src/documents/db.data';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: String): Promise<UserDocument> {
    const user = await this.userModel.findById( id );
    return user;
  }

  async findByName(name: String): Promise<UserDocument> {
    const user = await this.userModel.findOne({userName: name});
    return user;
  }

  async create(user: UserDocument): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    const newUser = await createdUser.save();
    return newUser;
  }

  async update(id: String, user: UserDocument): Promise<UserDocument> {
    const updUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
    return updUser;
  }

  async delete(id: String): Promise<UserDocument> {
    const deletetedUser = await this.userModel.findByIdAndRemove(id);
    return deletetedUser;
  }
}

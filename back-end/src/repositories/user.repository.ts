import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { UserDoc } from 'src/documents/db.data';


@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserDoc>,
  ) {}

  
  async findAll(): Promise<UserDoc[]> {
    const users = await this.userModel.find();
    return users;
  }
  
  async findOne(id: String): Promise<UserDoc> {
    const user = await this.userModel.findOne({ _id: id });
    return user;
  }
  
  async create(user: UserDoc): Promise<UserDoc> {
    const createduser = new this.userModel(user);
    const newuser = await createduser.save()
    return newuser;
  }

  async update(id: String, user: UserDoc): Promise<UserDoc> {
    const upduser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
    return upduser;
  }

  async delete(id: String): Promise<UserDoc> {    
    const deleteteduser = await this.userModel.findByIdAndRemove(id);
    return deleteteduser;
  }   
  async findByName(name: String): Promise<UserDoc> {
    const user = await this.userModel.findOne({userName: name})
    return user;
  }
}
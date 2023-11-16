import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async find() {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }
}

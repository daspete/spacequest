import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async find() {
        return this.userModel.find().exec();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email });

        if (!user) return null;

        return user.toJSON();
    }

    async create(user: User) {
        const newUser = new this.userModel(user);

        if (!newUser.password) {
            newUser.password = await bcryptjs.hash(
                'thisisapasswordforexternalusers',
                10,
            );
        }

        await newUser.save();

        return newUser.toJSON();
    }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.entity';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async getAll() {
        return this.userModel.find();
    }

    async create(data: CreateUserDto) {
        const password = await bcryptjs.hash(data.password, 10);
        return this.userModel.create({ ...data, password });
    }

    async login(data: LoginDto) {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new Error('invalid_credentials');
        }

        const valid = await bcryptjs.compare(data.password, user.password);
        if (!valid) {
            throw new Error('invalid_credentials');
        }

        const token = this.jwtService.sign(
            { sub: user.id },
            { expiresIn: '1d' },
        );
        return { user, token };
    }

    async me(token: string) {
        if (!token) {
            return null;
        }

        const data = this.jwtService.decode(token, { json: true });

        if (!data?.sub) {
            return null;
        }

        const user = await this.userModel.findById(data.sub);
        if (!user) {
            return null;
        }

        return user;
    }
}

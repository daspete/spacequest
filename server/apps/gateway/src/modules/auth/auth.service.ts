import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

class RegisterUserDto {
    id: number;
    email: string;
}

const users = [];

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    ) {}

    generateJwt(payload) {
        return this.jwtService.sign(payload);
    }

    async signIn(user) {
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const userExists = await this.findUserByEmail(user.email);

        if (!userExists) {
            console.log('create user');
            return this.registerUser(user);
        }

        return this.generateJwt({
            sub: userExists._id,
            email: userExists.email,
        });
    }

    async registerUser(user: RegisterUserDto) {
        users.push(user);

        return this.generateJwt({
            sub: user.id,
            email: user.email,
        });
    }

    async findUserByEmail(email) {
        const user = await firstValueFrom<{ _id: string; email: string }>(
            this.usersClient.send('users.findByEmail', email),
        );

        if (!user) return null;

        return user;
    }
}

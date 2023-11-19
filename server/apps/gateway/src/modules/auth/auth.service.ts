import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcryptjs from 'bcryptjs';
import { AuthUser } from './auth-user.entity';

interface RegisterUserDto {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
}

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
            throw new BadRequestException('invalid_payload');
        }

        const userExists = await this.findUserByEmail(user.email);

        if (user.provider !== 'local') {
            if (!userExists) {
                return this.registerUser(user);
            }
        }

        return this.generateJwt({
            sub: userExists.id,
            email: userExists.email,
        });
    }

    async registerUser(user: RegisterUserDto) {
        const newUser = await firstValueFrom<AuthUser>(
            this.usersClient.send('users.create', user),
        );

        return this.generateJwt({
            sub: newUser.id,
            email: newUser.email,
        });
    }

    async findUserByEmail(email) {
        const user = await firstValueFrom<AuthUser>(
            this.usersClient.send('users.findByEmail', email),
        );

        if (!user) return null;

        return user;
    }

    async validateUser(user: { email: string; password: string }) {
        const userExists = await this.findUserByEmail(user.email);

        if (!userExists) {
            return null;
        }

        if (userExists.provider !== 'local') return null;

        const hasValidPassword = await bcryptjs.compare(
            userExists.password,
            user.password,
        );
        if (hasValidPassword) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = userExists;

        return result;
    }

    async validateJwtPayload(payload) {
        const user = await this.findUserByEmail(payload.email);

        if (!user) {
            return null;
        }

        if (user.id !== payload.sub) {
            return null;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...result } = user;

        return result;
    }

    async validateToken(token: string) {
        const payload = this.jwtService.verify(token);

        return this.validateJwtPayload(payload);
    }
}

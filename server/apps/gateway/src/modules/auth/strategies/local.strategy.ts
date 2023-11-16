import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { firstValueFrom } from 'rxjs';

export type AuthUser = {
    _id: string;
    email: string;
    password: string;
    provider: string;
    providerId: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    ) {
        super();
    }

    async validate(email: string, password: string) {
        const user = await firstValueFrom<AuthUser>(
            this.usersClient.send('user.findByEmail', email),
        );

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.password !== password) {
            throw new UnauthorizedException();
        }

        const { password: _, ...result } = user;

        return result;
    }
}

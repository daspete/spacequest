import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { firstValueFrom } from 'rxjs';

export type JwtPayload = {
    sub: string;
    email: string;
};

export type AuthUser = {
    _id: string;
    email: string;
    provider: string;
    providerId: string;
    password: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    ) {
        const extractJwtFromCookie = (req) => {
            let token = null;

            if (req && req.cookies) {
                token = req.cookies['access_token'];
            }

            if (token) return token;

            return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        };
        super({
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('jwt.secret'),
            jwtFromRequest: extractJwtFromCookie,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await firstValueFrom<AuthUser>(
            this.usersClient.send('user.findByEmail', payload.email),
        );

        if(!user) {
            throw new UnauthorizedException();
        }

        if(user._id !== payload.sub) {
            throw new UnauthorizedException();
        }

        const { password: _, ...result } = user;

        return user;
    }
}

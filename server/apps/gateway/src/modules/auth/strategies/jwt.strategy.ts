import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
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
        const user = await this.authService.validateJwtPayload(payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get<string>('google.clientId'),
            clientSecret: configService.get<string>('google.clientSecret'),
            callbackURL: configService.get<string>('google.callbackUrl'),
            scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ) {
        const { id, given_name, family_name, email, picture } = profile;

        const user = {
            provider: 'google',
            providerId: id,
            email: email,
            firstName: given_name,
            lastName: family_name,
            picture: picture,
            accessToken,
            refreshToken,
        };

        done(null, user);
    }
}

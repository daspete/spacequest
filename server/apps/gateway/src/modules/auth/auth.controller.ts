import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Req() req, @Res() res: Response) {
        const token = await this.authService.signIn(req.user);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        });

        return res.json(true);
    }

    @Get('logout')
    async logout(@Res() res: Response) {
        res.clearCookie('access_token');

        return res.redirect(
            this.configService.get<string>('logout.callbackUrl'),
        );
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async auth() {}

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleAuthCallback(@Req() req, @Res() res: Response) {
        const token = await this.authService.signIn(req.user);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        });

        return res.redirect(this.configService.get<string>('client.url'));
    }

    @MessagePattern('auth.validateToken')
    async validateToken(token: string) {
        return await this.authService.validateToken(token);
    }
}

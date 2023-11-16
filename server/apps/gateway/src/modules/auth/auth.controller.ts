import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Req() req, @Res() res: Response) {
        const token = await this.authService.signIn(req.user);

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
        });

        return res.redirect(this.configService.get<string>('client.url'));
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
}

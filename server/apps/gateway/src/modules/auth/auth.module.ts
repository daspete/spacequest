import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        PassportModule,
        JwtModule.register({
            secret: config().jwt.secret,
        }),
        ClientsModule.register([
            {
                name: 'USERS_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'microservice-users',
                    port: 3001,
                },
            },
        ]),
    ],
    providers: [AuthService, GoogleStrategy],
    controllers: [AuthController],
    exports: [],
})
export class AuthModule {}

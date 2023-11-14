import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User, UserSchema } from './user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        JwtModule.register({
            secret: process.env.AUTH_SECRET,
            signOptions: {
                expiresIn: '5m',
            },
        }),
    ],
    providers: [AuthResolver, AuthService],
})
export class AuthModule {}

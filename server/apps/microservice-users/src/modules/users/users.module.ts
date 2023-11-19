import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { RemoteAuthModule } from '@app/remote-auth';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        RemoteAuthModule,
    ],
    providers: [UsersResolver, UsersService],
    controllers: [UsersController],
})
export class UsersModule {}

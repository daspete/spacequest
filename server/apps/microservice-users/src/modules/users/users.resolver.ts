import { Context, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { RemoteAuthGuard } from '@app/remote-auth/guards/remote-auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => [User])
    async users() {
        return this.usersService.find();
    }

    @UseGuards(RemoteAuthGuard)
    @Query(() => User)
    async me(@Context('user') user: User) {
        return user;
    }
}

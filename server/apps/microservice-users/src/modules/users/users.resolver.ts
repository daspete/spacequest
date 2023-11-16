import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(() => [User])
    async users() {
        return this.usersService.find();
    }
}

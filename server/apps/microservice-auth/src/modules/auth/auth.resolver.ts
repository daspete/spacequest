import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
// import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';

@Resolver(() => User)
// @UseInterceptors(AuthInterceptor)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => [User])
    async users() {
        return this.authService.getAll();
    }

    @UseGuards(AuthGuard)
    @Query(() => User)
    async me(@Context('user') user: User) {
        return user;
    }

    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserDto) {
        return this.authService.create(data);
    }

    @Mutation(() => User)
    async login(@Args('data') data: LoginDto, @Context('req') req: Request) {
        const { user, token } = await this.authService.login(data);
        // req.res.cookie('jwt', token, { httpOnly: true });
        req.res.header('authorization', `Bearer ${token}`);
        return user;
    }

    @UseGuards(AuthGuard)
    @Mutation(() => User)
    async logout(@Context('req') req: Request, @Context('user') user: User) {
        // req.res?.clearCookie('jwt');
        req.res.header('authorization', ``);
        return user;
    }
}

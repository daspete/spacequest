import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const token = ctx
            .getContext()
            .req.headers.authorization?.replace('Bearer ', '');
        const user: User | null = await this.authService.me(token);
        ctx.getContext().user = user;
        return !!user;
    }
}

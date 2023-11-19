import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RemoteAuthService } from '../remote-auth.service';

@Injectable()
export class RemoteAuthGuard implements CanActivate {
    constructor(private readonly remoteAuthService: RemoteAuthService) {}

    async canActivate(context: ExecutionContext) {
        const graphQlExecutionContext = GqlExecutionContext.create(context);
        const token = graphQlExecutionContext
            .getContext()
            .req.headers.authorization?.replace('Bearer ', '');

        const user = await this.remoteAuthService.me(token);

        graphQlExecutionContext.getContext().user = user;

        return !!user;
    }
}

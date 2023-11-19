import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RemoteAuthService {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    ) {}

    async me(token: string) {
        if (!token) return null;

        const user = await firstValueFrom(
            this.authClient.send('auth.validateToken', token),
        );

        return user;
    }
}

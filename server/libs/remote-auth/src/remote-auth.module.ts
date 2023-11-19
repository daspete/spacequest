import { Module } from '@nestjs/common';
import { RemoteAuthService } from './remote-auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'gateway',
                    port: 3001,
                },
            },
        ]),
    ],
    providers: [RemoteAuthService],
    exports: [RemoteAuthService],
})
export class RemoteAuthModule {}

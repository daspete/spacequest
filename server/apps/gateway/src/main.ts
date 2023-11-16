import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as waitOn from 'wait-on';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
    await waitOn({
        resources: [
            'http://microservice-users:3000/graphql',
            'http://microservice-players:3000/graphql',
            'http://microservice-games:3000/graphql',
        ],
        log: true,
        validateStatus(status) {
            return status >= 200 && status < 500;
        },
    });

    const app = await NestFactory.create(GatewayModule, {
        cors: {
            origin: process.env.CORS_ORIGINS.split(','),
            credentials: true,
        },
    });
    app.use(cookieParser());
    await app.listen(3000);
}
bootstrap();

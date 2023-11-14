import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('database.uri'),
                autoCreate: true,
                autoIndex: true,
            }),
            inject: [ConfigService],
        }),
        // MongooseModule.forRoot(process.env.MONGO_DSN, {
        //     autoIndex: true,
        //     autoCreate: true,
        // }),
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: { federation: 2 },
        }),
        AuthModule,
    ],
})
export class AppModule {}

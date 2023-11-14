import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GamesModule } from './modules/games/games.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: { federation: 2 },
        }),
        GamesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import {
    ApolloFederationDriver,
    ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PlayersModule } from './modules/players/players.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: { federation: 2 },
        }),
        PlayersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

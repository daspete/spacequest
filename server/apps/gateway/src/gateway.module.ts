import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLDataSource } from './datasources/graphql.datasource';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            gateway: {
                buildService({ url }) {
                    return new GraphQLDataSource({
                        url,
                        apq: true,
                    });
                },
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [
                        {
                            name: 'auth',
                            url: 'http://microservice-auth:3000/graphql',
                        },
                        {
                            name: 'players',
                            url: 'http://microservice-players:3000/graphql',
                        },
                        {
                            name: 'games',
                            url: 'http://microservice-games:3000/graphql',
                        },
                    ],
                    pollIntervalInMs: 5000,
                }),
            },
        }),
    ],
})
export class GatewayModule {}

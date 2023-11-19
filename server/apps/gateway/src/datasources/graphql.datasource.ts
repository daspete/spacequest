import {
    GraphQLDataSourceProcessOptions,
    RemoteGraphQLDataSource,
} from '@apollo/gateway';
import { GraphQLDataSourceRequestKind } from '@apollo/gateway/dist/datasources/types';

export class GraphQLDataSource extends RemoteGraphQLDataSource {
    willSendRequest(params: GraphQLDataSourceProcessOptions) {
        const { request, kind } = params;

        if (kind == GraphQLDataSourceRequestKind.INCOMING_OPERATION) {
            const cookie =
                params?.incomingRequestContext.request.http.headers.get(
                    'cookie',
                );

            if (!cookie) return;

            const findTokenCookie = () => {
                try {
                    const cookies = cookie.split(';');

                    const token = cookies.find((item) =>
                        item.includes('access_token'),
                    );

                    if (!token) return null;

                    return token.split('=')[1];
                } catch (err) {
                    return null;
                }
            };

            const token = findTokenCookie();

            request.http.headers.set('authorization', `Bearer ${token}`);
        }
    }
}

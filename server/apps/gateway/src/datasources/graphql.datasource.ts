import {
    GraphQLDataSourceProcessOptions,
    RemoteGraphQLDataSource,
} from '@apollo/gateway';
import { GraphQLDataSourceRequestKind } from '@apollo/gateway/dist/datasources/types';

export class GraphQLDataSource extends RemoteGraphQLDataSource {
    didReceiveResponse({ response, context }): typeof response {
        const token = response.http.headers.get('authorization');

        if (token !== null) {
            context.req.res.cookie('jwt', token.replace('Bearer ', ''), {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 5),
            });
        }

        return response;
    }

    willSendRequest(params: GraphQLDataSourceProcessOptions) {
        const { request, kind } = params;

        if (kind === GraphQLDataSourceRequestKind.INCOMING_OPERATION) {
            const cookie =
                params?.incomingRequestContext.request.http.headers.get(
                    'cookie',
                );

            if (!cookie) return;
            const findTokenCookie = () => {
                const cookies = cookie.split(';');
                const token = cookies.find((item) => item.includes('jwt'));
                if (!token) return;
                return token.split('=')[1];
            };

            const token = findTokenCookie();
            request.http.headers.set('authorization', `Bearer ${token}`);
        }
    }
}

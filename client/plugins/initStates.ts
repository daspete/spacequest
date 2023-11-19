import type { User } from '~/types/user';
import meQuery from '../graphql/queries/me.gql'

export default defineNuxtPlugin(async () => {
    const { data: meData, error } = await useAsyncQuery<User>(meQuery);
    if (meData) {
        useMe().value = meData.value;
    }
});

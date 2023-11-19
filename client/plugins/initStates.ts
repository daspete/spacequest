import type { User } from '~/types/user';
import meQuery from '../graphql/queries/me.gql'

export default defineNuxtPlugin(async () => {
    const { data: meData, error } = await useAsyncQuery<User>(meQuery);
    console.log('meData', meData, error);
    if (meData) {
        useMe().value = meData.value;
    }
});

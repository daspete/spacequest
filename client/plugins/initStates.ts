import type { User } from '~/types/user';
import meQuery from '../graphql/queries/me.gql'

export default defineNuxtPlugin(async () => {
    const { data: meData, error } = await useAsyncQuery<{ me: User }>(meQuery);
    if (meData?.value?.me) {
        useMe().value = meData.value.me;
    }
});

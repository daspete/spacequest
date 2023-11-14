import { Query, Resolver } from '@nestjs/graphql';
import { Player } from './player.entity';
import { PlayersService } from './players.service';

@Resolver(() => Player)
export class PlayersResolver {
    constructor(private playersService: PlayersService) {}

    @Query(() => [Player])
    async players(): Promise<Array<Player>> {
        return this.playersService.findAll();
    }
}

import { Query, Resolver } from '@nestjs/graphql';
import { Game } from './game.entity';
import { GamesService } from './games.service';

@Resolver(() => Game)
export class GamesResolver {
    constructor(private gamesService: GamesService) {}

    @Query(() => [Game])
    async games(): Promise<Array<Game>> {
        return this.gamesService.findAll();
    }
}

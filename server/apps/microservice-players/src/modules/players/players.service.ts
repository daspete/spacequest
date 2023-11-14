import { Injectable } from '@nestjs/common';
import { Player } from './player.entity';

@Injectable()
export class PlayersService {
    async findAll(): Promise<Array<Player>> {
        return [];
    }
}

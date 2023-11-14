import { Injectable } from '@nestjs/common';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
    async findAll(): Promise<Array<Game>> {
        return [];
    }
}

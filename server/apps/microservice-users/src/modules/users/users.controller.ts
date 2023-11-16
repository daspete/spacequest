import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern('users.findByEmail')
    async findByEmail(email: string) {
        return this.usersService.findByEmail(email);
    }
}

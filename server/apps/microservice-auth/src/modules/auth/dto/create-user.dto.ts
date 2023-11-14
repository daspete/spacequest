import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, MaxLength } from 'class-validator';
import { UserStatus } from '../user.entity';

@InputType()
export class CreateUserDto {
    @Field()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @Field()
    @MaxLength(255)
    password: string;

    @Field(() => UserStatus)
    @IsEnum(UserStatus)
    status: UserStatus;
}

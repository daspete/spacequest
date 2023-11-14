import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Game {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;
}

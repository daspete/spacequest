import {
    Field,
    HideField,
    ID,
    ObjectType,
    registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
});

@ObjectType()
@Schema({ timestamps: true, collection: 'users', toJSON: { virtuals: true } })
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({ required: true })
    provider: string;

    @Field()
    @Prop({ required: true })
    providerId: string;

    @Field({ nullable: true })
    firstname: string;

    @Field({ nullable: true })
    lastname: string;

    @Field({ nullable: true })
    nickname: string;

    @Field()
    @Prop({ required: true, unique: true })
    email: string;

    @HideField()
    @Prop({ required: true })
    password: string;

    @Field(() => UserStatus)
    @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

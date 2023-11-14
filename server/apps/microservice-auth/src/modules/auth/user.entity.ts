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
@Schema({ timestamps: true, collection: 'users' })
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    @HideField()
    password: string;

    @Field(() => UserStatus)
    @Prop({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

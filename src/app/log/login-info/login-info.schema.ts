import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class LoginInfo extends Document {
  @Prop({ required: true })
  username: string;

  @Prop()
  ip: string;

  @Prop()
  location: string;

  @Prop()
  agent: string;

  @Prop()
  os: string;

  @Prop()
  status: number;

  @Prop()
  message: string;

  @Prop()
  time: string;
}

export const LoginInfoSchema = SchemaFactory.createForClass(LoginInfo);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Comment,CommentSchema } from 'src/comments/comments.schema';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  tel: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  dat: string;

  @Prop()
  subject?: string;

  @Prop()
  problem?: string;

  @Prop({ type: [{ type: Object, ref: 'Comment' }] }) // Array of Comments
  comments?: Comment[];
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

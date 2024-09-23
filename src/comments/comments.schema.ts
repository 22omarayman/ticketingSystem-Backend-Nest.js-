import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  posted: Date;

  @Prop({ type: Types.ObjectId, ref: 'Ticket', required: true }) // Ensure this line exists
  ticketId: Types.ObjectId; // Reference to the associated ticket
}

export const CommentSchema = SchemaFactory.createForClass(Comment);


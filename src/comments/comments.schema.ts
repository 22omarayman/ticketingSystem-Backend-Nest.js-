import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  name: { type: String, required: true }, // Name of the commenter
  text: { type: String, required: true }, // Comment text
  posted: { type: Date, default: Date.now }, // Default to the current date and time
  ticket: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true }, // Reference to the related Ticket
});

import { Schema } from 'mongoose';

export const TicketSchema = new Schema({
  id: { type: Number, required: true }, // Assuming 'id' is a number, but MongoDB uses ObjectId, so you may want to omit this or let MongoDB auto-generate it.
  name: { type: String, required: true }, // Name is a required string field
  image: { type: String }, // Optional field for an image (as a URL or path)
  email: { type: String, required: true }, // Required email field
  tel: { type: String }, // Optional telephone field
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' }, // Priority with predefined values
  dat: { type: Date, default: Date.now }, // Default value is the current date/time
  subject: { type: String, required: true }, // Required subject field
  problem: { type: String, required: true }, // Required problem/description field
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] // Array of references to comments (assuming the relation with the Comment schema)
});

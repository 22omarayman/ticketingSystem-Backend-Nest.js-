import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './create-comment.dto';
import { validate } from 'class-validator';
import { Ticket } from 'src/tickets/tickets.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface Comment extends Document {
  readonly name: string;
  readonly text: string;
  readonly posted: Date;
  readonly ticketId: Ticket; // Reference to the associated ticket
}

export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>, // Inject the Mongoose model
  ) {}

  // Get all comments for a specific ticket
  async getCommentsByTicket(ticketId: number): Promise<Comment[]> {
    return this.commentModel.find({ ticketId }).exec(); // This returns a Promise<Comment[]>
  }

  // Add a new comment to a ticket
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel({
      ...createCommentDto,
      posted: new Date(),
    });
    return newComment.save(); // This also returns a Promise<Comment>
  }
}

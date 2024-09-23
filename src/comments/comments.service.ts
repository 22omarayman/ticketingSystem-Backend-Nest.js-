import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './create-comment.dto';
import { validate } from 'class-validator';
import { Ticket } from 'src/tickets/tickets.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export interface Comment extends Document {
  readonly name: string;
  readonly text: string;
  readonly posted: Date;
  readonly ticketId: Types.ObjectId; // Reference to the associated ticket
}

export class CommentService {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>, // Inject the Mongoose model
  ) {}

  // Get all comments for a specific ticket
  async getCommentsByTicket(ticketId: string): Promise<Comment[]> {
    return this.commentModel.find({ ticketId: ticketId }).exec(); // Ensure ticketId is used correctly
  }
  

  // Add a new comment to a ticket
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel({
      ...createCommentDto,
      ticketId: createCommentDto.ticketId,
      posted: new Date(),

    });

    return newComment.save(); // This also returns a Promise<Comment>
  }
}

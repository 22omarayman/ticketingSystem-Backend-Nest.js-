import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './create-ticket.dto';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


export interface Ticket extends Document {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly email: string;
  readonly tel: string;
  readonly priority: string;
  readonly dat: Date;
  readonly subject: string;
  readonly problem: string;
}

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel('Ticket') private readonly ticketModel: Model<Ticket>,
    @InjectModel('Comment') private commentModel: Model<Comment>

  ) {}

  async findAll(): Promise<Ticket[]> {
    try {
      return await this.ticketModel.find().exec();
    } catch (error) {
      console.error('Error fetching tickets:', error.message); // Log the error message
      return []; // Return an empty array on error
    }
  }

  async findOne(ticketId: string): Promise<Ticket | null> {
    try {
      return this.ticketModel.findById(ticketId).populate('comments').exec(); // Populate comments
    } catch (error) {
      console.error(`Error fetching ticket with ID ${ticketId}:`, error.message);
      return null;
    }
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket | null> {
    try {
      const newTicket = new this.ticketModel(createTicketDto);
      return await newTicket.save();
    } catch (error) {
      console.error('Error creating ticket:', error.message);
      return null; // Return null if there's an error creating the ticket
    }
  }
   // Add a comment to a ticket
   async addComment(ticketId: string, createCommentDto: any): Promise<Comment> {
    const comment = new this.commentModel({
      ...createCommentDto,
      ticketId,
      posted: new Date()
    });
    const savedComment = await comment.save();
    
    // Push the comment to the ticket's comments array
    await this.ticketModel.findByIdAndUpdate(ticketId, {
      $push: { comments: savedComment._id }
    });
    return savedComment;
  }

  // Get all comments for a specific ticket
  async getCommentsByTicket(ticketId: string): Promise<Comment[]> {
    return this.commentModel.find({ ticketId }).exec();
  }
}

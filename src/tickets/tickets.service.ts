import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './create-ticket.dto';
import { Document } from 'mongoose';


export interface Ticket extends Document {
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
  ) {}

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec(); // Return all tickets from MongoDB
  }

  async findOne(id: string): Promise<Ticket> {
    return this.ticketModel.findById(id).exec(); // Find one ticket by its ID
  }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const newTicket = new this.ticketModel(createTicketDto); // Create a new Ticket model instance
    return newTicket.save(); // Save the ticket to the database
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Ticket, TicketsService } from './tickets.service';
import { CreateTicketDto } from './create-ticket.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from 'src/comments/create-comment.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketsService) {}

  

  @Get()
  async getTickets() {
    const tickets = await this.ticketService.findAll();
    if (!tickets) {
      throw new HttpException('Tickets not found', HttpStatus.NOT_FOUND);
    }
    return tickets;
  }

  @Get(':id')
async getTicket(@Param('id') id: string): Promise<Ticket | null> {
  return await this.ticketService.findOne(id);
}


  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    const newTicket = await this.ticketService.create(createTicketDto);
    if (!newTicket) {
      throw new HttpException('Unable to create ticket', HttpStatus.BAD_REQUEST);
    }
    return newTicket;
  }
  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    return this.ticketService.getCommentsByTicket(id);
  }

  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.ticketService.addComment(id, createCommentDto);
  }
}

import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './create-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  getAllTickets() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  getTicketById(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }
}

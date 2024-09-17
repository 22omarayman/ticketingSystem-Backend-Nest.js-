import { Module } from '@nestjs/common';
import { TicketController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './tickets.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Ticket', schema: TicketSchema }])],
  controllers: [TicketController],
  providers: [TicketsService]
})
export class TicketsModule {}

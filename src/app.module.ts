import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { CommentsModule } from './comments/comments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TicketsModule, CommentsModule,
    ConfigModule.forRoot(), // Load .env file
    MongooseModule.forRoot(process.env.MONGO_URI),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

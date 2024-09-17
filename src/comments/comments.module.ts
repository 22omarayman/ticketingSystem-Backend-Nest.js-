import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './comments.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentsModule {}

import { Controller, Get, Post, Param, Body, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { CommentService, Comment } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

   // Get comments for a specific ticket
   @Get(':ticketId/comments')
   async getComments(@Param('ticketId') ticketId: string): Promise<Comment[]> {
     return this.commentService.getCommentsByTicket(ticketId);
   }
   

 
   // Add a comment to a ticket
   @Post(':ticketId/comments')
   async createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
     return this.commentService.createComment(createCommentDto); // Await the result from the service method
   }
}


import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  readonly ticketId: string; // Add ticketId to link comments to tickets
}

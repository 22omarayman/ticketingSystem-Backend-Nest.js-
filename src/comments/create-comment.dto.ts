import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsInt()
  readonly ticketId: number;
}

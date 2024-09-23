export class CreateTicketDto {
  readonly name: string;
  readonly email: string;
  readonly tel: string;
  readonly img: string;
  readonly priority: string;
  readonly dat: string; // Changed from string to Date for consistency
  readonly subject?: string;
  readonly problem?: string;
}

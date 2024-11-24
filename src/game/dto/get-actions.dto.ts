import { IsNotEmpty } from 'class-validator';

export class GetActionsDto {
  @IsNotEmpty({ message: 'Client is required' })
  clientId: number;
}

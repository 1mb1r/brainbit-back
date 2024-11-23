import { IsNotEmpty } from 'class-validator';

export class JoinGameDto {
  @IsNotEmpty({ message: 'clientId is required' })
  clientId: number;
}

import { IsNotEmpty } from 'class-validator';

export class ContinueGameDto {
  @IsNotEmpty({ message: 'Client is required' })
  clientId: number;

  @IsNotEmpty({ message: 'Effect is required' })
  effect: string;

  @IsNotEmpty({ message: 'Prompt is required' })
  prompt: string;
}

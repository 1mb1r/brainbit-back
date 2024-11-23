import { IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  mac_address: string;
}

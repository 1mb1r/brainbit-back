import { IndicatorsData } from '../types';

export class CreateMemoryStorageDto {
  mac_address: string;
  data: Partial<IndicatorsData>;
}

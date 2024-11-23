import { PartialType } from '@nestjs/mapped-types';
import { CreateMemoryStorageDto } from './create-memory-storage.dto';

export class UpdateMemoryStorageDto extends PartialType(CreateMemoryStorageDto) {}

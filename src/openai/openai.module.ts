import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { OpenaiService } from './openai.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}

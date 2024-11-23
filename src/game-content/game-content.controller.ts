import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { GameContentService } from './game-content.service';
import { CreateGameContentDto } from './dto/create-game-content.dto';
import { UpdateGameContentDto } from './dto/update-game-content.dto';

@Controller('game-contents')
export class GameContentController {
  constructor(private readonly gameContentService: GameContentService) {}

  @Post()
  create(@Body() createGameContentDto: CreateGameContentDto) {
    return this.gameContentService.create(createGameContentDto);
  }

  @Get()
  findAll() {
    return this.gameContentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameContentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameContentDto: UpdateGameContentDto,
  ) {
    return this.gameContentService.update(+id, updateGameContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameContentService.remove(+id);
  }
}

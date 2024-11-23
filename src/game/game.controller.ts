import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';

import { GameService } from './game.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { JoinGameDto } from './dto/join-game.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create() {
    return this.gameService.create({ state: 'created' });
  }

  @Post(':id/join')
  joinGame(@Param('id') id: string, @Body() joinGameDto: JoinGameDto) {
    return this.gameService.joinGame(+id, joinGameDto);
  }

  @Post(':id/start')
  startGame(@Param('id') id: string) {
    return this.gameService.startGame(+id);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(+id, updateGameDto);
  }
}

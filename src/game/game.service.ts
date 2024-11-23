import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './game.repository';
import { JoinGameDto } from './dto/join-game.dto';
import { ClientRepository } from '../client/client.repository';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly clientRepository: ClientRepository,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  findAll() {
    const games = this.gameRepository.find();
    return games;
  }

  findOne(id: number) {
    const game = this.gameRepository.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!game) {
      throw new HttpException(
        `Game with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return game;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    const game = this.gameRepository.update(id, updateGameDto);
    return game;
  }

  async joinGame(id: number, joinGameDto: JoinGameDto) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['clients'],
    });

    if (!game) {
      throw new HttpException(
        `Game with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const client = await this.clientRepository.findOneBy({
      id: joinGameDto.clientId,
    });

    if (!client) {
      throw new HttpException(
        `Client with ID ${joinGameDto.clientId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (
      game.clients.some((existingClient) => existingClient.id === client.id)
    ) {
      throw new HttpException(
        `Client with ID ${joinGameDto.clientId} is already in the game`,
        HttpStatus.BAD_REQUEST,
      );
    }

    game.clients.push(client);

    return await this.gameRepository.save(game);
  }
}

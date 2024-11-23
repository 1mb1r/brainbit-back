import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './game.repository';
import { JoinGameDto } from './dto/join-game.dto';
import { ClientRepository } from '../client/client.repository';
import { OpenaiService } from 'src/openai/openai.service';
import { generatePrologPrompt } from 'src/prompt/promptGenerator';
import { GameContentRepository } from 'src/game-content/game-content.repository';

enum RoleHorror {
  maniac = 'maniac',
  victim = 'victim',
}

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    private readonly clientRepository: ClientRepository,
    private readonly openaiService: OpenaiService,
    private readonly gameContentRepository: GameContentRepository,
  ) {}

  create(createGameDto: CreateGameDto) {
    return this.gameRepository.save(createGameDto);
  }

  findAll() {
    const games = this.gameRepository.find({
      relations: ['clients.role', 'gameContents'],
    });
    return games;
  }

  async findOne(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['clients.role', 'gameContents'],
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
      relations: ['clients.role', 'gameContents'],
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

  async startGame(id: number) {
    const game = await this.gameRepository.findOne({
      where: { id },
      relations: ['clients.role', 'gameContents'],
    });

    if (!game) {
      throw new HttpException(
        `Game with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const playerNames = {};

    game.clients.forEach((client) => {
      playerNames[client.role.name] = client;
    });

    const prompt = generatePrologPrompt(
      playerNames[RoleHorror.maniac].name,
      playerNames[RoleHorror.victim].name,
    );

    const data = await this.openaiService.generateText(prompt);
    game.state = 'started';
    game.time_start = new Date();
    game.currentPlayer = playerNames[RoleHorror.maniac];

    const gptData = JSON.parse(data.choices[0].message.content);

    const gameContent = this.gameContentRepository.create({
      text: gptData.text,
      prompt,
      order: gptData.order,
      client: playerNames[RoleHorror.maniac],
    });
    await this.gameContentRepository.save(gameContent);

    game.gameContents.push(gameContent);

    return await this.gameRepository.save(game);
  }
}

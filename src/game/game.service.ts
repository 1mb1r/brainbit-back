import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepository } from './game.repository';
import { JoinGameDto } from './dto/join-game.dto';
import { ClientRepository } from '../client/client.repository';
import { OpenaiService } from 'src/openai/openai.service';
import {
  generateActionsPrompt,
  generatePrologPrompt,
  generateNextStoryPrompt,
} from 'src/prompt/promptGenerator';
import { GameContentRepository } from 'src/game-content/game-content.repository';
import { GetActionsDto } from './dto/get-actions.dto';
import { MemoryStorageService } from 'src/memory-storage/memory-storage.service';
import { ContinueGameDto } from './dto/continue-game.dto';

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
    private readonly memoryStorageService: MemoryStorageService,
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
      order: {
        gameContents: {
          order: 'ASC',
        },
      },
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

    const dalleData = await this.openaiService.generateImage(gptData.text);

    const gameContent = this.gameContentRepository.create({
      text: gptData.text,
      prompt,
      order: 0,
      time: gptData.time,
      description: gptData.description,
      image: dalleData.data[0].url,
      client: playerNames[RoleHorror.maniac],
    });
    await this.gameContentRepository.save(gameContent);

    game.gameContents.push(gameContent);

    return await this.gameRepository.save(game);
  }

  async createActions(id: number, getActionsDto: GetActionsDto) {
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
    const client = await this.clientRepository.findOne({
      where: { id: getActionsDto.clientId },
      relations: ['device', 'role'],
    });

    // const testBrainbitData = this.memoryStorageService.get(
    //   client.device.mac_address,
    // );
    // console.log(testBrainbitData[0].concentration);

    const brainbitData = this.generateConcentrationArray();

    const prompt = generateActionsPrompt(
      client.role.name,
      brainbitData[0].concentration,
    );

    const data = await this.openaiService.generateText(prompt);
    const gptData = JSON.parse(data.choices[0].message.content);

    const gameContent = this.gameContentRepository.create({
      prompt,
      client: client,
      actions: gptData,
    });
    return await this.gameContentRepository.save(gameContent);
  }

  async continueGame(id: number, continueGameDto: ContinueGameDto) {
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

    const client = await this.clientRepository.findOne({
      where: { id: continueGameDto.clientId },
      relations: ['device', 'role'],
    });

    const nextClient = game.clients.find((cl) => cl.id !== client.id);
    const gameContents = game.gameContents.filter((gc) => gc.order !== null);
    const lastGameContent = gameContents[gameContents.length - 1];
    const order = lastGameContent.order + 1;
    const prompt = generateNextStoryPrompt(
      continueGameDto.prompt,
      continueGameDto.effect,
      order,
    );

    const data = await this.openaiService.generateText(prompt);
    game.currentPlayer = nextClient;

    const gptData = JSON.parse(data.choices[0].message.content);

    const dalleData = await this.openaiService.generateImage(gptData.text);

    const gameContent = this.gameContentRepository.create({
      text: gptData.text,
      prompt,
      order: order,
      time: gptData.time,
      description: gptData.description,
      image: dalleData.data[0].url,
      client: nextClient,
    });
    await this.gameContentRepository.save(gameContent);

    game.gameContents.push(gameContent);

    return await this.gameRepository.save(game);
  }

  generateConcentrationArray() {
    const result = [];
    let currentValue = Math.floor(Math.random() * 101);

    for (let i = 0; i < 5; i++) {
      result.push(currentValue);

      const change = Math.floor(Math.random() * 21) - 10;
      currentValue = Math.min(100, Math.max(0, currentValue + change));
    }

    return result;
  }
}

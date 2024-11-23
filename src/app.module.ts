import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { RoleModule } from './role/role.module';
import { ClientModule } from './client/client.module';
import { LogModule } from './log/log.module';
import { GameModule } from './game/game.module';
import { GameContentModule } from './game-content/game-content.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/entity/*{.ts,.js}'],
          synchronize: true,
          migrations: [],
          logging: false,
        };
      },
    }),
    DeviceModule,
    RoleModule,
    ClientModule,
    LogModule,
    GameModule,
    GameContentModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
